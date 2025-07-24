
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
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.querySelector(".toggle-password");
  const rememberCheckbox = document.getElementById("remember");

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

  // Login form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Get stored user from localStorage
    const storedUserJSON = localStorage.getItem("user");
    const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      // Successful login
      localStorage.setItem("loggedIn", "1");

      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      localStorage.setItem("loggedIn", "0");
      alert("Invalid email or password.");
    }
  });
});

