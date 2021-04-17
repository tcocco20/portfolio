const title = document.querySelector(".name");
const subtitle = document.querySelector(".subtitle");
const landing = document.querySelector(".landing");

const makeSpan = (el) => {
  const letters = el.innerText;
  el.innerText = "";

  for (let i = 0; i < letters.length; i++) {
    const span = document.createElement("span");
    span.innerText = letters[i];
    el.append(span);
  }
};

(() => {
  makeSpan(title);
  makeSpan(subtitle);
})();

landing.addEventListener("mousemove", () => {
  const spans = title.parentNode.querySelectorAll("span");
  spans.forEach((s) => {
    if (calcDistance(s) < 80) s.classList.add("highlight");
    else s.classList.remove("highlight");
  });
});

const calcDistance = (el) => {
  el = el.getBoundingClientRect();
  return Math.floor(
    Math.sqrt(
      (window.event.clientX - (el.left + el.width / 2)) ** 2 +
        (window.event.clientY - (el.top + el.height / 2)) ** 2
    )
  );
}
