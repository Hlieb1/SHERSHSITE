let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
});

window.addEventListener("load", () => {
  const loader = document.getElementById("logo-loader");
  const video = document.querySelector(".video-hero video");

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      video.style.opacity = "1";
      video.style.filter = "brightness(0.5)";
    }, 800);
  }, 3500);
});




