import { calcDistance } from "./landing.js";

const colors = ["#F6F0FE", "#DFABCA", "#E9C1D4"],
  starsM = document.querySelector(".stars-mid"),
  starsF = document.querySelector(".stars-front"),
  starsB = document.querySelector(".stars-back");
var shooting;

const generateStars = () => {
  for (let i = 0; i < window.innerWidth / 20; i++) {
    makeStar(starsF);
    makeStar(starsB);
    makeStar(starsM);
  }
};

const makeStar = (el) => {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.floor(Math.random() * 101) + "%";
  star.style.top = Math.floor(Math.random() * 101) + "%";
  star.style.opacity = "0";
  star.style.height = Math.random() * 5 + 2 + "px";
  star.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  el.append(star);
  const h = star.offsetHeight;
  star.style.width = h + "px";

  setInterval(() => {
    if (Math.random() > 0.2) {
      star.style.opacity = Math.random();

      setTimeout(() => {
        star.style.opacity = "0.4";
      }, 200);
    }

    if (Math.random() > 0.5) {
      // star.style.transform = "scale(0.2)";

      setTimeout(() => {
        star.style.transform = "scale(1)";
      }, 500);
    }
  }, Math.random() * 200 + 500);
};

(() => {
  const parStars = document.querySelector(".par-stars");
  const landing = document.querySelector(".landing");
  const title = document.querySelector(".title");

  for (let i = 0; i < 500; i++) {
    makeStar(parStars);
  }

  setTimeout(() => {
    landing.classList.remove("zoom");
    parStars.classList.remove("zoom");
  }, 500);

  setTimeout(() => {
    generateStars();
    title.classList.remove("hidden");
  }, 4000);

  setTimeout(() => {
    landing.classList.remove("t");
    landing.addEventListener("mousemove", (e) => {
      const x = e.clientX - window.innerWidth / 2,
        y = e.clientY - window.innerHeight / 2;
      moveStars(landing, x, y, 40);
      moveStars(starsB, x, y, 20);
      moveStars(starsM, x, y, 13);
      moveStars(starsF, x, y, 7);
      // lightStars();
    });
    parStars.remove();
  }, 5000);
})();

const moveStars = (el, x, y, n) => {
  el.style.top = -y / n + "px";
  el.style.left = -x / n + "px";
};

const shootingStar = () => {
  const sstar = document.createElement("div");
  const landing = document.querySelector(".landing");
  sstar.className = "star shooting";
  landing.append(sstar);
  sstar.style.transform = `rotate(${
    Math.random() * 360
  }deg) translateX(-60vmax) rotate(${
    Math.random() * 60 - 30
  }deg) translateX(0vmax) scale(${Math.random() * 0.8 + 0.5})`;
};

const shoot = () => {
  const star = document.querySelector(".star.shooting");
  let transform = star.style.transform.split(" "),
    tx = +star.style.transform.split("(")[4].split("v")[0],
    scale = transform[4];
  transform.pop();
  transform.pop();
  transform = transform.join(" ");

  tx += 1;

  star.style.transform = `${transform} translateX(${tx}vmax) ${scale}`;

  if (tx < 120) requestAnimationFrame(shoot);
  else star.remove();
};

const startShooting = () => {
  shooting = setInterval(() => {
    const chance = Math.random();
    if (chance > 0.7 && document.hasFocus()) {
      shootingStar();
      shoot();
    }
  }, 2000);
};

setTimeout(startShooting, 2000);

setTimeout(() => {
  document.addEventListener("scroll", () => {
    const y = window.pageYOffset,
      h = window.innerHeight,
      w = window.innerWidth,
      stars = document.querySelectorAll(".star"),
      fall = ["falling1", "falling2", "falling3", "falling4", "falling5"];

    if (y > h * 0.2) {
      clearInterval(shooting);
      shooting = false;
    } else {
      if (!shooting) startShooting();
    }

    if (y > h * 0.6) {
      stars.forEach((s) => {
        s.classList.add(fall[Math.floor(Math.random() * fall.length)]);
        setTimeout(() => s.remove(), 4000);
      });
    } else {
      if (stars.length < 20) generateStars();
    }
  });
}, 4000);

const grow = (x) => x + (9 - x) + 0.58 * x;

const lightStars = () => {
  const stars = document.querySelectorAll(".star:not(.shooting, .highlight)");
  stars.forEach((s) => {
    if (calcDistance(s) < window.innerWidth / 18) {
      s.classList.add("highlight");
      s.style.height = grow(s.offsetHeight) + "px";
      s.style.width = s.offsetHeight + "px";
    }
  });
};