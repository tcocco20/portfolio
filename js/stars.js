const colors = ["#F6F0FE", "#DFABCA", "#E9C1D4"];

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
      star.style.transform = "scale(0.2)";

      setTimeout(() => {
        star.style.transform = "scale(1)";
      }, 500);
    }
  }, Math.random() * 200 + 500);
};

(() => {
  const parStars = document.querySelector(".par-stars");
  const landing = document.querySelector(".landing");
  const starsF = document.querySelector(".stars-front");
  const starsB = document.querySelector(".stars-back");
  const starsM = document.querySelector(".stars-mid");
  const title = document.querySelector(".title");

  for (let i = 0; i < 500; i++) {
    makeStar(parStars);
  }

  setTimeout(() => {
    landing.classList.remove("zoom");
    parStars.classList.remove("zoom");
  }, 500);

  setTimeout(() => {
    for (let i = 0; i < window.innerWidth / 20; i++) {
      makeStar(starsF);
      makeStar(starsB);
      makeStar(starsM);
    }
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
  }deg) translateX(-60vmax)`;
};

const shoot = () => {
  const star = document.querySelector(".star.shooting");
  const rotate = star.style.transform.split(" ")[0];
  let dg = +rotate.split("(")[1].split("d")[0];
  let tx = +star.style.transform.split("X(")[1].split("v")[0];

  tx += 0.8;
  star.style.transform = `${rotate} translateX(${tx}vmax)`;

  if (tx < 120) requestAnimationFrame(shoot);
  else star.remove();
};

shootingStar();
shoot();
