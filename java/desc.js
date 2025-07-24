
// Page Loader
window.addEventListener("load", function () {
  setTimeout(() => {
    document.querySelector(".loader").style.transition = "opacity 0.8s ease";
    document.querySelector("#overlayer").style.transition = "opacity 0.8s ease";
    document.querySelector(".loader").style.opacity = 0;
    document.querySelector("#overlayer").style.opacity = 0;

    setTimeout(() => {
      document.querySelector(".loader").style.display = "none";
      document.querySelector("#overlayer").style.display = "none";
    }, 800);
  }, 2000); // Duration to show loader
});
