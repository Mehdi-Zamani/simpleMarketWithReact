const swDev = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((reg) => {
          console.log("sw register success");
        })
        .catch((err) => console.error("sw register failed", err));
    });
  }
};
export default swDev;
