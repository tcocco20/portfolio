const colors = ["#F6F0FE", "#DFABCA", "#E9C1D4"];

export function makeStar() {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.floor(Math.random() * 101) + "vw";
  star.style.top = Math.floor(Math.random() * 101) + "vh";
  star.style.opacity = "0.4";
  star.style.height = Math.random() * 5 + 2 + "px";
  star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  document.body.append(star);
  const h = star.offsetHeight
  star.style.width = h + "px";

  setInterval(() => {
    if (Math.random() > 0.2) {
      star.style.opacity = Math.random();
      setTimeout(() => {
        star.style.opacity = "0.4";
      }, 200);
    }
    if (Math.random() > 0.2) {
        star.style.height = Math.random() * 5 + 2 + "px";
        star.style.width = star.offsetHeight + "px";
      setTimeout(() => {
        star.style.height = h + "px";
        star.style.width = h + "px";
      }, 500);
    }
  }, Math.random() * 200 + 500);
}

for (let i = 0; i < 100; i++) {
  makeStar();
}
