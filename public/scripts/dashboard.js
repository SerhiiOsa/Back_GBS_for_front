/* global ModalWindow */
/* global ConfirmModalWindow */

document.addEventListener("DOMContentLoaded", async function () {
  //Options and common functions
  const categoriesData = [
    {
      name: "specializations",
      form: `<%- include('../../public/portions/specializations_form.ejs'); %>`,
      children: true,
      links: {
        category: "schools",
      },
    },
    {
      name: "schools",
      form: `<%- include('../../public/portions/schools_form.ejs'); %>`,
      children: false,
      links: {
        category: "specializations",
      },
    },
    {
      name: "videos",
      form: `<%- include('../../public/portions/videos_form.ejs'); %>`,
      children: false,
      links: {
        category: "specializations",
      },
    },
  ];

  const searchOptions = {
    apiUrl: "/api/v1/",
    category: {
      specializations: "specializations/",
      schools: "schools/",
      videos: "videos/",
      logout: "auth/logout",
    },
    params: {
      roots: "?root=true",
      children: "?parentId=",
    },
  };

  const fetchData = {
    async getData(category, param, parentId) {
      try {
        const response = await fetch(
          searchOptions.apiUrl +
            searchOptions.category[category.name] +
            (searchOptions.params[param] || "") +
            (parentId || ""),
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Error during getting items:", error);
      }
    },

    async getLinksData(categoryName, categoryId, linkCategoryName) {
      try {
        const response = await fetch(
          searchOptions.apiUrl +
            searchOptions.category[categoryName] +
            categoryId +
            "/" +
            searchOptions.category[linkCategoryName],
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Error during getting items:", error);
      }
    },

    async createNewItem(category, editingForm) {
      const formData = new FormData();

      for (const element of editingForm.elements) {
        if (element.name) {
          if (element.type === "file") {
            const files = element.files;
            if (files.length > 0) {
              formData.append(element.name, files[0]);
            }
          } else if (element.value.trim() !== "") {
            formData.append(element.name, element.value);
          }
        }
      }
      try {
        const response = await fetch(
          searchOptions.apiUrl + searchOptions.category[category.name],
          {
            method: "POST",
            body: formData,
          },
        );
        if (!response.ok) {
          const data = await response.json();
          const error = new Error(`${data.error}`);
          error.status = response.status;
          throw error;
        }
        loadCategoryContent(category);
        return response.status;
      } catch (error) {
        console.error("Error during creation:", error);
        return error;
      }
    },

    async createLink(category, categoryId, linkCategoryName, linkCategoryId) {
      try {
        const response = await fetch(
          searchOptions.apiUrl +
            searchOptions.category[category.name] +
            categoryId +
            "/" +
            searchOptions.category[linkCategoryName] +
            linkCategoryId,
          {
            method: "POST",
          },
        );

        if (!response.ok) {
          const data = await response.json();
          const error = new Error(`${data.error}`);
          error.status = response.status;
          throw error;
        }

        return response.status;
      } catch (error) {
        console.error("Error during creation:", error);
        return error;
      }
    },

    async updateItem(category, editingForm, itemId) {
      const formData = new FormData();

      for (const element of editingForm.elements) {
        if (element.name) {
          if (element.type === "file") {
            const files = element.files;
            if (files.length > 0) {
              formData.append(element.name, files[0]);
            }
          } else if (element.value.trim() !== "") {
            formData.append(element.name, element.value);
          }
        }
      }
      try {
        const response = await fetch(
          searchOptions.apiUrl + searchOptions.category[category.name] + itemId,
          {
            method: "PUT",
            body: formData,
          },
        );

        if (!response.ok) {
          const data = await response.json();
          const error = new Error(`${data.error}`);
          error.status = response.status;
          throw error;
        }
        loadCategoryContent(category);
        return response.status;
      } catch (error) {
        console.error("Error during updating:", error);
        return error;
      }
    },

    async deleteItem(category, editingForm, itemId) {
      try {
        const response = await fetch(
          searchOptions.apiUrl + searchOptions.category[category.name] + itemId,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          const data = await response.json();
          const error = new Error(`${data.error}`);
          error.status = response.status;
          throw error;
        }
        loadCategoryContent(category);
        return response.status;
      } catch (error) {
        console.error("Error during deleting:", error);
        return error;
      }
    },

    async deleteLink(
      categoryName,
      categoryId,
      linkCategoryName,
      linkCategoryId,
    ) {
      try {
        const response = await fetch(
          searchOptions.apiUrl +
            searchOptions.category[categoryName] +
            categoryId +
            "/" +
            searchOptions.category[linkCategoryName] +
            linkCategoryId,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          const data = await response.json();
          const error = new Error(`${data.error}`);
          error.status = response.status;
          throw error;
        }

        return response.status;
      } catch (error) {
        console.error("Error during deleting:", error);
        return error;
      }
    },

    async logOut() {
      try {
        const response = await fetch(
          searchOptions.apiUrl + searchOptions.category.logout,
          {
            method: "POST",
          },
        );

        if (!response.ok) {
          const data = await response.json();
          const error = new Error(`${data.error}`);
          error.status = response.status;
          throw error;
        }
        return response.status;
      } catch (error) {
        console.error("Error during log out:", error);
      }
    },
  };

  const buttonSettings = {
    info: {
      text: "i",
      class: "info-btn",
      title: "info",
    },
    links: {
      info: {
        text: "l",
        class: "links-btn",
        title: "links",
      },
      "create-btn": {
        text: "+",
        class: "create-btn",
        title: "create",
      },
      "delete-btn": {
        text: "x",
        class: "delete-btn",
        title: "delete",
        action: fetchData.deleteLink,
      },
    },
    editing: {
      "create-btn": {
        text: "+",
        class: "create-btn",
        title: "create",
      },
      "update-btn": {
        text: "e",
        class: "update-btn",
        title: "edit",
      },
      "delete-btn": {
        text: "x",
        class: "delete-btn",
        title: "delete",
      },
    },
    submit: {
      "create-btn": {
        text: "Create",
        class: "create-btn",
        action: fetchData.createNewItem,
      },
      "update-btn": {
        text: "Update",
        class: "update-btn",
        action: fetchData.updateItem,
      },
      "delete-btn": {
        text: "Delete",
        class: "delete-btn",
        action: fetchData.deleteItem,
      },
    },
  };

  const inputSettings = {
    specializations: {
      name: { htmlName: "specializationName" },
      description: {},
      extendedDescription: {},
      parentId: {},
    },
    schools: {
      name: { htmlName: "schoolName" },
      description: {},
      link: {},
    },
    videos: {
      name: { htmlName: "videoName" },
      link: {},
    },
  };

  //Classes
  class CategoryItem {
    constructor(data, category, container) {
      this.data = data;
      this.category = category;
      this.itemElement = document.createElement("li");
      this.container = container;
      this.fetchedChildren = null;
      this.childrenShown = null;
      this.handleClick();
      this.render();
    }

    async createInfoBtn() {
      new InfoBtn(this.category, this.itemElement, this.data);
    }

    async createEditingBtn(type) {
      new EditingBtn(type, this.category, this.itemElement, this.data);
    }

    async createLinksBtn() {
      new LinksBtn(this.category, this.itemElement, this.data);
    }

    async createLinksDeleteBtn(
      loadContentWindow,
      contentWindowLoadedFromCategory,
    ) {
      new LinksDeleteBtn(
        this.category,
        this.itemElement,
        this.data,
        loadContentWindow,
        contentWindowLoadedFromCategory,
      );
    }

    showChildren() {
      this.itemElement.querySelector(".children-container").style.display =
        "block";
      this.childrenShown = true;
    }

    hideChildren() {
      this.itemElement.querySelector(".children-container").style.display =
        "none";
      this.childrenShown = false;
    }

    handleClick() {
      if (this.category.children) {
        this.itemElement.addEventListener("click", async (event) => {
          event.stopPropagation();
          clearContentEditingWindow();
          if (this.fetchedChildren) {
            if (this.childrenShown) {
              this.hideChildren();
            } else {
              this.showChildren();
            }
          } else {
            const childsData = await fetchData.getData(
              this.category,
              "children",
              this.data.id,
            );
            const childrendContainer = document.createElement("ul");
            childrendContainer.classList.add("children-container");
            this.itemElement.appendChild(childrendContainer);
            childsData.forEach(async (childData) => {
              const childItem = new CategoryItem(
                childData,
                this.category,
                childrendContainer,
              );
              childItem.createEditingBtn("create-btn");
              childItem.createEditingBtn("update-btn");
              childItem.createEditingBtn("delete-btn");
              childItem.createInfoBtn();
              childItem.createLinksBtn();
            });
            this.fetchedChildren = true;
            this.childrenShown = true;
          }
        });
      }
    }

    render() {
      this.itemElement.innerText = this.data.name;
      this.container.appendChild(this.itemElement);
    }
  }

  class EditingBtn {
    constructor(type, category, container, containerData) {
      this.type = type;
      this.category = category;
      this.container = container;
      this.containerData = containerData || null;
      this.btnElement = document.createElement("button");
      this.btnElement.addEventListener("click", this.handleClick.bind(this));
      this.render();
    }

    render() {
      this.stylize();
      this.container.appendChild(this.btnElement);
    }

    stylize() {
      const btnSettings = buttonSettings.editing[this.type];
      this.btnElement.innerHTML = btnSettings.text;
      this.btnElement.classList.add("content-editing-btn", btnSettings.class);
      this.btnElement.setAttribute("title", `${btnSettings.title}`);
    }

    handleClick(event) {
      event.stopPropagation();
      new EditingForm(this.category, this.type, this.containerData);
    }
  }

  class InfoBtn {
    constructor(category, container, containerData) {
      this.category = category;
      this.container = container;
      this.containerData = containerData;
      this.btnElement = document.createElement("button");
      this.btnElement.addEventListener("click", this.handleClick.bind(this));
      this.render();
    }

    render() {
      this.stylize();
      this.container.appendChild(this.btnElement);
    }

    stylize() {
      const btnSettings = buttonSettings.info;
      this.btnElement.innerHTML = btnSettings.text;
      this.btnElement.classList.add("content-info-btn", btnSettings.class);
      this.btnElement.setAttribute("title", `${btnSettings.title}`);
    }

    handleClick(event) {
      event.stopPropagation();
      const contentWindow = document.getElementById("content-editing");
      contentWindow.innerHTML = "";
      for (const key in this.containerData) {
        const keyElement = document.createElement("h4");
        keyElement.innerHTML = key;
        contentWindow.appendChild(keyElement);

        const keyValueElement = document.createElement("p");
        if (key === "createdAt" || key === "updatedAt") {
          keyValueElement.innerHTML = new Date(
            this.containerData[key],
          ).toLocaleString();
        } else if (key === "image") {
          keyValueElement.innerHTML = this.containerData[key]
            ? `<a href='${this.containerData[key]}' target='_blank'><img src='${this.containerData[key]}' alt='img'></a>`
            : "-";
        } else {
          keyValueElement.innerHTML = this.containerData[key] || "-";
        }
        contentWindow.appendChild(keyValueElement);
      }
    }
  }

  class LinksBtn {
    constructor(category, container, containerData) {
      this.category = category;
      this.container = container;
      this.containerData = containerData;
      this.btnElement = document.createElement("button");
      this.btnElement.addEventListener("click", this.handleClick.bind(this));
      this.render();
    }

    render() {
      this.stylize();
      this.container.appendChild(this.btnElement);
    }

    stylize() {
      const btnSettings = buttonSettings.links.info;
      this.btnElement.innerHTML = btnSettings.text;
      this.btnElement.classList.add("content-editing-btn", btnSettings.class);
      this.btnElement.setAttribute("title", `${btnSettings.title}`);
    }

    loadContentWindow = async (linksCategory, category, containerDataId) => {
      const contentWindowLoadedFromCategory = this.category;
      const contentWindow = document.getElementById("content-editing");
      contentWindow.innerHTML = "";
      const linkTitle = document.createElement("h3");
      linkTitle.innerHTML = linksCategory;
      contentWindow.appendChild(linkTitle);

      this.createLinksCreateBtn(linkTitle, this.loadContentWindow);

      const linkItemsContainer = document.createElement("ul");
      const linkItemsData = await fetchData.getLinksData(
        category.name,
        containerDataId,
        linksCategory,
      );
      linkItemsData.forEach(async (linkItemData) => {
        linkItemData.fetchedElementId = containerDataId;
        const linkItem = new CategoryItem(
          linkItemData,
          linksCategory,
          linkItemsContainer,
        );
        linkItem.createLinksDeleteBtn(
          this.loadContentWindow,
          contentWindowLoadedFromCategory,
        );
      });
      contentWindow.appendChild(linkItemsContainer);
    };

    createLinksCreateBtn(container, loadContentWindow) {
      new LinksCreateBtn(
        this.category,
        this.containerData,
        container,
        loadContentWindow,
      );
    }

    async handleClick(event) {
      event.stopPropagation();
      await this.loadContentWindow(
        this.category.links.category,
        this.category,
        this.containerData.id,
      );
    }
  }

  class LinksDeleteBtn {
    constructor(
      category,
      container,
      containerData,
      loadContentWindow,
      contentWindowLoadedFromCategory,
    ) {
      this.type = "delete-btn";
      this.category = categoriesData.find((element) => {
        return element.name === category;
      });
      this.fetchedElementCategory = contentWindowLoadedFromCategory;
      this.container = container;
      this.containerData = containerData;
      this.loadContentWindow = loadContentWindow;
      this.btnElement = document.createElement("button");
      this.btnElement.addEventListener("click", this.handleClick.bind(this));
      this.render();
    }

    render() {
      this.stylize();
      this.container.appendChild(this.btnElement);
    }

    stylize() {
      const btnSettings = buttonSettings.links[this.type];
      this.btnElement.innerHTML = btnSettings.text;
      this.btnElement.classList.add("content-editing-btn", btnSettings.class);
    }

    async handleClick(event) {
      const btnAction = buttonSettings.links[this.type].action;
      event.stopPropagation();

      const responseData = await btnAction(
        this.fetchedElementCategory.name,
        this.containerData.fetchedElementId,
        this.category.name,
        this.containerData.id,
      );
      if (responseData === 200) {
        await this.loadContentWindow(
          this.category.name,
          this.fetchedElementCategory,
          this.containerData.fetchedElementId,
        );
        return;
      }
      if (responseData === 401) {
        window.location.href = "/admin/login";
        return;
      }
    }
  }

  class LinksCreateBtn {
    constructor(category, itemData, container, loadContentWindow) {
      this.type = "create-btn";
      this.category = category;
      this.container = container;
      this.itemData = itemData;
      this.linksCategory = categoriesData.find((element) => {
        return element.name === this.category.links.category;
      });
      this.loadContentWindow = loadContentWindow;
      this.btnElement = document.createElement("button");
      this.btnElement.addEventListener("click", this.handleClick.bind(this));
      this.render();
    }

    render() {
      this.stylize();
      this.container.appendChild(this.btnElement);
    }

    stylize() {
      const btnSettings = buttonSettings.links[this.type];
      this.btnElement.innerHTML = btnSettings.text;
      this.btnElement.classList.add("content-editing-btn", btnSettings.class);
    }

    async handleClick(event) {
      event.stopPropagation();
      const listItemsToAddData = await fetchData.getData(this.linksCategory);
      const dropDownList = document.createElement("ul");
      dropDownList.classList.add("drop-down-list");

      listItemsToAddData.forEach((itemToAddData) => {
        new ListItemtoAdd(
          itemToAddData,
          this.category,
          dropDownList,
          this.linksCategory,
          this.itemData,
          this.loadContentWindow,
        );
      });

      this.container.parentNode.appendChild(dropDownList);
    }
  }

  class ListItemtoAdd {
    constructor(
      data,
      category,
      container,
      linksCategory,
      linksData,
      loadContentWindow,
    ) {
      this.data = data;
      this.category = category;
      this.itemElement = document.createElement("li");
      this.container = container;
      this.linksCategory = linksCategory;
      this.linksData = linksData;
      this.loadContentWindow = loadContentWindow;
      this.itemElement.addEventListener("click", this.handleClick.bind(this));
      this.render();
    }

    render() {
      this.itemElement.innerText = this.data.name;
      this.container.appendChild(this.itemElement);
    }

    async handleClick() {
      const responseData = await fetchData.createLink(
        this.category,
        this.linksData.id,
        this.linksCategory.name,
        this.data.id,
      );
      if (responseData === 201) {
        await this.loadContentWindow(
          this.linksCategory.name,
          this.category,
          this.linksData.id,
        );
        return;
      }
      if (responseData === 401) {
        window.location.href = "/admin/login";
        return;
      }
    }
  }

  class EditingForm {
    constructor(category, type, data) {
      this.category = category;
      this.type = type;
      this.data = data;
      this.formContent = category.form;
      this.formContainer = document.getElementById("content-editing");
      this.display();
    }

    display() {
      this.formContainer.innerHTML = "";
      this.formContainer.innerHTML = this.formContent;
      this.editingForm = document.getElementById("editing-form");
      this.submitBtn = document.getElementById("editing-submit-btn");
      this.submitBtn.addEventListener("click", this.handleClick.bind(this));
      this.stylizeBtn();
      this.inputData();
    }

    stylizeBtn() {
      const btnSettings = buttonSettings.submit[this.type];
      this.submitBtn.innerText = btnSettings.text;
      this.submitBtn.classList.add(btnSettings.class);
    }

    async handleClick(event) {
      event.preventDefault();
      if (this.type === "delete-btn") {
        if (ModalWindow.IS_OPENED) {
          return;
        }
        const isConfirmed = await this.showDeleteConfirmation();
        if (!isConfirmed) {
          return;
        }
      }

      const messageWindow = document.getElementById("message-window");
      if (this.editingForm.checkValidity()) {
        const btnSettings = buttonSettings.submit[this.type];
        const action = btnSettings.action;
        let responseData;
        if (this.data) {
          responseData = await action(
            this.category,
            this.editingForm,
            this.data.id,
          );
        } else {
          responseData = await action(this.category, this.editingForm);
        }

        if (responseData === 200 || responseData === 201) {
          messageWindow.classList.remove("error");
          messageWindow.classList.add("success");
          messageWindow.innerHTML = responseData;
          return;
        }
        if (responseData.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        messageWindow.classList.remove("success");
        messageWindow.classList.add("error");
        messageWindow.innerHTML = responseData.message;
      } else {
        messageWindow.classList.add("error");
        messageWindow.innerHTML = "Form fields are not valid";
      }
    }

    async showDeleteConfirmation() {
      return new Promise((resolve) => {
        const confirmModal = new ConfirmModalWindow(
          `Are you sure? This will delete ${this.data.name}.`,
        );

        confirmModal.confirmBtn.addEventListener(
          "click",
          function clickHandler() {
            confirmModal.hide();
            confirmModal.confirmBtn.removeEventListener("click", clickHandler);
            resolve(true);
          },
        );

        confirmModal.cancelBtn.addEventListener(
          "click",
          function clickHandler() {
            confirmModal.hide();
            confirmModal.cancelBtn.removeEventListener("click", clickHandler);
            resolve(false);
          },
        );
      });
    }

    inputData() {
      if (!this.data) {
        return;
      }
      if (this.type === "create-btn") {
        const inputElement = document.getElementById("parentId");
        if (inputElement) {
          inputElement.value = this.data.id;
        }
      } else {
        const currentInputSettings = inputSettings[this.category.name];
        Object.entries(currentInputSettings).forEach(
          ([fieldName, fieldConfig]) => {
            const inputElement = document.getElementById(
              fieldConfig.htmlName || fieldName,
            );
            if (inputElement) {
              inputElement.value = this.data[fieldName] || null;
            }
          },
        );
      }
    }
  }

  //Entry point
  await loadCategories();

  //main functions for displaying start content
  async function loadCategories() {
    const categoriesList = document.getElementById("categories");
    categoriesData.forEach(async (category) => {
      const categoryElement = document.createElement("li");
      categoryElement.textContent = category.name;
      new EditingBtn("create-btn", category, categoryElement);

      categoryElement.addEventListener("click", async () => {
        clearContentEditingWindow();
        await loadCategoryContent(category);
      });
      categoriesList.appendChild(categoryElement);
    });
  }

  async function loadCategoryContent(category) {
    const categoryContent = document.getElementById("category-content");
    categoryContent.innerHTML = "";
    const rootItemsData = await fetchData.getData(category, "roots");

    rootItemsData.forEach(async (rootItemData) => {
      const rootItem = new CategoryItem(
        rootItemData,
        category,
        categoryContent,
      );
      if (category.children) {
        rootItem.createEditingBtn("create-btn");
      }
      if (category.links) {
        rootItem.createLinksBtn();
      }
      rootItem.createEditingBtn("update-btn");
      rootItem.createEditingBtn("delete-btn");
      rootItem.createInfoBtn();
    });
  }

  function clearContentEditingWindow() {
    const contentEditingWindow = document.getElementById("content-editing");
    contentEditingWindow.innerHTML = "";
  }

  //Function to leave the page
  async function leaveDashboard() {
    const logOutBtn = document.getElementById("logout-btn");
    logOutBtn.addEventListener("click", async function logOutHandler(event) {
      event.stopPropagation();

      await fetchData.logOut();

      //cleaning page before redirection
      let pageContent = document.getElementById("container");
      logOutBtn.removeEventListener("click", logOutHandler);
      pageContent.remove();
      pageContent = null;

      window.location.href = "/admin/login";
    });
  }

  //End point of the page
  await leaveDashboard();
});
