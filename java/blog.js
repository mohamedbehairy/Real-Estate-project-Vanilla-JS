
function loader() {
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
}
loader();

function audio() {
  document.querySelectorAll(".style-audio").forEach(player => {
    const audio = player.querySelector("audio");
    const playBtn = player.querySelector(".play-btn");
    const progressBar = player.querySelector(".progress-filled");
    const duration = player.querySelector(".duration");


    playBtn.addEventListener("click", () => {

      document.querySelectorAll("audio").forEach(a => {
        if (a !== audio) {
          a.pause();
          a.parentElement.querySelector(".play-btn").innerText = "▶";
        }
      });
      if (audio.paused) {
        audio.play();
        playBtn.textContent = "❚❚";
      } else {
        audio.pause();
        playBtn.textContent = "▶";
      }
    });

    audio.addEventListener("timeupdate", () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = percent + "%";
      duration.innerText = audio.currentTime.toFixed(2);
    });


    audio.addEventListener("ended", () => {
      playBtn.textContent = "▶";
    });
  });
}
audio();

function buttonScrollUp() {

  let btnElm = document.querySelector('.scrollTop')

  function checkscroll() {
    if (window.scrollY > 300) {
      btnElm.style.display = "block";
    } else {
      btnElm.style.display = "none";
    }
  }
  window.addEventListener("scroll", checkscroll);
  btnElm.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })
}
buttonScrollUp();

function searchCards() {
  const searchInput = document.getElementById('blogSearch')
  const blogCards = document.querySelectorAll(".blog-cards .card");
  searchInput.addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    blogCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      if (title.includes(searchText)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}
searchCards();

function darkmode() {
  document.getElementById('darkModeToggle').addEventListener('click', function () {

    document.body.classList.toggle('dark-mode');

  });
}
darkmode();


