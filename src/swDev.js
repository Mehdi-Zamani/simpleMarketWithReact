const swDev = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((reg) => console.log("sw register success", reg))
        .catch((err) => console.log("sw register failed", err));
    });
  }
};
export default swDev;
