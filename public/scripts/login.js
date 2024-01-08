/* global ModalWindow */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function formHandler(event) {
    event.preventDefault();

    if (ModalWindow.IS_OPENED) {
      return;
    }

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      //cleaning page before redirection
      let pageContent = document.getElementById("container");
      form.removeEventListener("submit", formHandler);
      pageContent.remove();
      pageContent = null;

      window.location.href = "/admin/dashboard";
      return;
    } catch (error) {
      if (error.message == 400) {
        new ModalWindow("Invalid login or password. Please try again.");
        return;
      }
      new ModalWindow("Internal server error. Please try again later.");
    }
  });
});
