// eslint-disable-next-line no-unused-vars
class ModalWindow {
  static IS_OPENED = false;

  constructor(message) {
    this.message = message;
    this.modalWindowElement = document.getElementById("modal-window");
    this.messageContainer = this.modalWindowElement.querySelector(
      "#modal-window .message",
    );
    this.closeBtn = this.modalWindowElement.querySelector(
      "#modal-window .close",
    );

    if (!this.modalWindowElement || !this.messageContainer || !this.closeBtn) {
      console.error("Modal window elements are missing.");
      return;
    }

    if (ModalWindow.IS_OPENED) {
      return;
    }

    this.createContent();
    this.show();
    this.setupEventListeners();
  }

  createContent() {
    this.messageContainer.innerHTML = this.message;
  }

  show() {
    this.modalWindowElement.style.display = "flex";
    ModalWindow.IS_OPENED = true;
  }

  hide() {
    this.modalWindowElement.style.display = "none";
    ModalWindow.IS_OPENED = false;
    this.removeEventListeners();
  }

  setupEventListeners() {
    this.closeBtn.addEventListener("click", this.closeBtnHandler.bind(this));

    window.addEventListener("click", this.windowClickHandler.bind(this));

    document.addEventListener("keydown", this.keydownHandler.bind(this));
  }

  removeEventListeners() {
    this.closeBtn.removeEventListener("click", this.closeBtnHandler);
    window.removeEventListener("click", this.windowClickHandler);
    document.removeEventListener("keydown", this.keydownHandler);
  }

  closeBtnHandler() {
    this.hide();
  }

  windowClickHandler(event) {
    if (event.target === this.modalWindowElement) {
      this.hide();
    }
  }

  keydownHandler(event) {
    if (event.key === "Escape") {
      this.hide();
    }
  }
}

// eslint-disable-next-line no-unused-vars
class ConfirmModalWindow extends ModalWindow {
  constructor(message) {
    super(message);
  }

  createContent() {
    super.createContent();
    this.addBtns();
  }

  addBtns() {
    this.btnContainer = document.createElement("div");
    this.btnContainer.classList.add("buttons");

    this.confirmBtn = document.createElement("button");
    this.confirmBtn.classList.add("confirm-button");
    this.confirmBtn.innerText = "Yes";

    this.cancelBtn = document.createElement("button");
    this.cancelBtn.classList.add("cancel-button");
    this.cancelBtn.innerText = "No";

    this.btnContainer.appendChild(this.confirmBtn);
    this.btnContainer.appendChild(this.cancelBtn);

    this.contentContainer = document.querySelector("#modal-window .content");
    this.contentContainer.appendChild(this.btnContainer);
  }

  hide() {
    super.hide();
    this.btnContainer.remove();
  }
}
