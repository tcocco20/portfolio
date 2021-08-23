const colors = ["#F6F0FE", "#DFABCA", "#E9C1D4"],
  [starLayers, landing, landingPage] = mapTo(
    "**.stars",
    ".landing",
    ".landing-page"
  ),
  [starsF, starsB, starsM] = [...starLayers];
var shooting;

const generateStars = () => {
  for (let i = 0; i < innerWidth / 30; i++) makeStar(starsF);
  for (let i = 0; i < innerWidth / 5; i++) makeStar(starsB);
  for (let i = 0; i < innerWidth / 15; i++) makeStar(starsM);

  requestAnimationFrame(starsAppear);
};

const starsAppear = () => {
  const stars = $$(".star"),
    op = +stars[0].style.opacity;

  stars.forEach((star) => (star.style.opacity = op + 0.02));

  if (op < 0.4) requestAnimationFrame(starsAppear);
};

const makeStar = (el) => {
  let size = Rand.between(3, 1);
  if (el === starsM) size += 1.5;
  if (el === starsF) size += 3;

  const large = grow(size) + "px";
  size += "px";

  const star = el.build({
    tag: "div",
    className: "star",
    small: size,
    large,
    style: {
      left: Rand.between(101, 0, true) + "%",
      top: Rand.between(101, 0, true) + "%",
      opacity: 0,
      height: size,
      width: size,
      backgroundColor: Rand.choice(colors),
      transform: "scale(1)",
    },
  })[1];

  setInterval(flicker.bind(this, star), Rand.between(700, 500));
};

const flicker = (star) => {
  if (!star.hasClass("highlight")) {
    if (Rand.num() > 0.5) {
      const scale = +star.style.transform.split("scale(")[1].split(")")[0];
      if (scale > 0.5) star.style.transform = `scale(${Rand.between(0.5)})`;
      else star.style.transform = `scale(${Rand.between(1, 0.5)})`;
    }
  }
};

export const initStars = () => {
  startShooting();
  generateStars();
  dropStars();
  landingPage.on("mousemove", createParallax);
};

const createParallax = (e) => {
  const x = e.clientX - innerWidth / 2,
    y = e.clientY - innerHeight / 2,
    els = [landing, ...starLayers],
    vals = [35, 3, 15, 9];

  for (let i = 0; i < els.length; i++) moveStars(els[i], x, y, vals[i]);

  lightStars();
};

const moveStars = (el, x, y, n) => {
  el.style.top = -y / n + "px";
  el.style.left = -x / n + "px";
};

const shootingStar = () => {
  // chance star will shoot
  const sstar = $(".star.shooting");
  if (Rand.num() < 0.6 || !document.hasFocus() || sstar) return;

  const star = landing.build({
    tag: "div",
    className: "star shooting",
    style: {
      transform: `rotate(${Rand.between(
        360
      )}deg) translateX(-60vmax) rotate(${Rand.between(
        30,
        -30
      )}deg) translateX(0vmax) scale(${Rand.between(1.3, 0.5)})`,
    },
  })[1];

  shoot(star);
};

const shoot = (star) => {
  let transform = star.style.transform.split(" "),
    tx = +star.style.transform.split("(")[4].split("v")[0] + 1,
    scale = transform[4];
  transform.pop(2);
  transform = transform.join(" ");

  star.style.transform = `${transform} translateX(${tx}vmax) ${scale}`;

  // distance sstar travels
  if (tx < 120) requestAnimationFrame(shoot.bind(null, star));
  else star.remove();
};

const startShooting = () => {
  // interval between attempting to shoot star
  shooting = setInterval(shootingStar, 2000);
};

const dropStars = () =>
  document.on("scroll", () => {
    setTimeout(positionHandler, 100);
  });

const positionHandler = () => {
  const h = innerHeight,
    y = pageYOffset,
    stars = $$(
      ".star:not(.shooting, .falling1, .falling2, .falling3, .falling4, .falling5)"
    ),
    fall = ["falling1", "falling2", "falling3", "falling4", "falling5"];

  if (y > h * 0.2) {
    clearInterval(shooting);
    shooting = false;
  } else {
    if (!shooting) startShooting();
  }

  if (y > h * 0.6) {
    stars.forEach((s) => {
      s.addClass(Rand.choice(fall));
      setTimeout(() => s.remove(), 4000);
    });
  } else {
    if (stars.length < 20) generateStars();
  }
};

const grow = (x) => 5 + 0.58 * x;

const lightStars = () => {
  const stars = $$(".stars-front .star");

  stars.forEach((s) => {
    if (calcDistance(s) < innerWidth / 18) {
      if (!s.hasClass("highlight")) {
        s.style.transform = "scale(1)";
        s.addClass("highlight");
        s.size(s.large);
      }
    } else {
      if (s.hasClass("highlight")) {
        s.addClass("trans");
        s.removeClass("highlight");
        s.size(s.small);

        setTimeout(() => s.classList.remove("trans"), 1000);
      }
    }
  });
};
