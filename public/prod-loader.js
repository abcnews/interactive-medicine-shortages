(function () {
  import(new URL("index.js", document.currentScript.src).href)
    .then((module) => {
      module.default?.();
    })
    .catch((error) => {
      console.error("Failed to load index.js", error);
    });
})();
