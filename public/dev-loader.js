import("http://localhost:5173/src/main.ts")
  .then(() => console.log("Dev module loaded..."))
  .catch((error) => console.error("Dev module not loaded...", error));
