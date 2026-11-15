for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  button.addEventListener("click", () => {
    void navigator.clipboard.writeText(button.dataset["copy"] ?? "").then(() => {
      button.dataset["copied"] = "true";
      window.setTimeout(() => {
        delete button.dataset["copied"];
      }, 1500);
    });
  });
}
