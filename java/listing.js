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
  }, 2000);
});

// price range
const priceRange = document.getElementById("priceRange");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");

// Initial values
minPrice.textContent = formatPrice(priceRange.min);
maxPrice.textContent = formatPrice(priceRange.max);

priceRange.addEventListener("input", () => {
  minPrice.textContent = formatPrice(priceRange.value);
});

function formatPrice(value) {
  let millions = value / 1000000;
  return `${millions}M`;
}

// Results Count
function updateVisibleCardsCount() {
  const visibleCards = document.querySelectorAll(
    ".property-grid .property-card"
  );

  const visibleCount = Array.from(visibleCards).filter(
    (card) => getComputedStyle(card.parentElement).display !== "none"
  ).length;

  const countElement = document.getElementById("resultsCount");
  if (countElement) {
    countElement.textContent = visibleCount;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateVisibleCardsCount();
});

// Form Filter
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("filterForm");
  const keywordInput = document.getElementById("keywordInput");
  const cityFilter = document.getElementById("cityFilter");
  const priceRange = document.getElementById("priceRange");
  const maxPriceDisplay = document.getElementById("maxPrice");

  priceRange.addEventListener("input", function () {
    maxPriceDisplay.textContent = (priceRange.value / 1000000).toFixed(0) + "M";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loader for 600ms
    showMiniLoader(() => {
      const keyword = keywordInput.value.toLowerCase().trim();
      const selectedCity = cityFilter.value.toLowerCase();
      const maxPrice = parseInt(priceRange.value);

      const cards = document.querySelectorAll(".property-card");

      cards.forEach((card) => {
        const title = card
          .querySelector(".card-title")
          .textContent.toLowerCase();
        const location = card
          .querySelector(".card-text")
          .textContent.toLowerCase();
        const priceText = card.querySelector(".price span").textContent;
        const price = parseInt(priceText.replace(/\$|M/g, "")) * 1000000;

        const matchKeyword = keyword === "" || title.includes(keyword);
        const matchCity =
          selectedCity === "" || location.includes(selectedCity);
        const matchPrice = price <= maxPrice;

        if (matchKeyword && matchCity && matchPrice) {
          card.parentElement.style.display = "block";
        } else {
          card.parentElement.style.display = "none";
        }
      });

      updateVisibleCardsCount();
    });
  });

  function updateFilteredResultsCount() {
    const visibleCards = document.querySelectorAll(
      "#propertiesList .property-card:not([style*='display: none'])"
    );
    const count = visibleCards.length;
    const resultsCount = document.getElementById("resultsCount");
    if (resultsCount) {
      resultsCount.textContent = count;
    }
  }
});

// Sort
document.addEventListener("DOMContentLoaded", function () {
  const sortSelect = document.getElementById("sortSelect");

  sortSelect.addEventListener("change", function () {
    // Show loader for 600ms
    showMiniLoader(() => {
      const sortOrder = this.value;
      const grid = document.querySelector(".property-grid");
      const cards = Array.from(grid.querySelectorAll(".property-card"));

      const visibleCards = cards.filter((card) => {
        return card.parentElement.style.display !== "none";
      });

      visibleCards.sort((a, b) => {
        const priceA = parseInt(
          a.querySelector(".price span").textContent.replace(/\$|M/g, "")
        );
        const priceB = parseInt(
          b.querySelector(".price span").textContent.replace(/\$|M/g, "")
        );

        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });

      visibleCards.forEach((card) => {
        grid.appendChild(card.parentElement);
      });
    });
  });
});

// Grid icons Filter + Restore default active icon if re-shown
document.addEventListener("DOMContentLoaded", function () {
  const gridBtn = document.querySelectorAll(".view-toggle")[0];
  const listBtn = document.querySelectorAll(".view-toggle")[1];
  const propertyGrid = document.querySelector(".property-grid");

  // Grid view
  gridBtn.addEventListener("click", function () {
    propertyGrid.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  // List view
  listBtn.addEventListener("click", function () {
    propertyGrid.classList.add("list-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });

  // Restore active icon if screen > xs again
  window.addEventListener("resize", function () {
    if (window.innerWidth > 575.98) {
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
      propertyGrid.classList.remove("list-view");
    }
  });
});

// ========== Mini Loader Function ==========
function showMiniLoader(callback) {
  const loader = document.querySelector(".loader");
  const overlay = document.querySelector("#overlayer");

  loader.style.display = "block";
  overlay.style.display = "block";

  // Force reflow to make transition work
  void loader.offsetWidth;

  loader.style.opacity = 1;
  overlay.style.opacity = 1;

  setTimeout(() => {
    loader.style.opacity = 0;
    overlay.style.opacity = 0;

    setTimeout(() => {
      loader.style.display = "none";
      overlay.style.display = "none";
      if (callback) callback();
    }, 600);
  }, 900);
}
