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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");

  // Redirect if already logged in
  if (localStorage.getItem("loggedIn") === "1") {
    window.location.href = "index.html";
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    // Store user in localStorage for login validation
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    // Set login flag
    localStorage.setItem("loggedIn", "1");

    alert("Account created successfully!");
    window.location.href = "index.html";
  });

  function validateEmail(email) {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email.toLowerCase());
  }
});
