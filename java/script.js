document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });
});


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

document.addEventListener("DOMContentLoaded", function () {
  const loginFlag = localStorage.getItem("loggedIn");
  const welcomeMsg = document.getElementById("welcomeMsg");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.getElementById("loginLink");

  if (loginFlag === "1") {
    const username = localStorage.getItem("name") || " ";
    welcomeMsg.textContent = `Welcome ${username}`;
    logoutBtn.style.display = "inline-block";
    loginLink.style.display = "none";
  } else {
    welcomeMsg.textContent = "";
    logoutBtn.style.display = "none";
    loginLink.style.display = "inline-block";
  }

  logoutBtn.addEventListener("click", function () {
    localStorage.setItem("loggedIn", "0");
    window.location.reload(); // Reload to reflect UI changes
  });
});

