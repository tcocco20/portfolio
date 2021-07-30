const elements = mapTo(".name", ".subtitle", ".landing", "html"),
  [title, subtitle, landing, html] = elements;

const makeSpan = (...els) => els.forEach((el) => 
  el.cutText().build(...[...el.data].map((l) => ({ tag: "span", innerText: l }))));

export const initLanding = () => {
  makeSpan(title, subtitle);
  setTimeout(readyPage, 5000);
  html.addClass("loading");
};

const readyPage = () => {
  landing.addEventListener("mousemove", checkDistance);
  html.removeClass("loading");
};

const checkDistance = (e) => 
  $$(".title span").forEach((s) => {
    if (calcDistance(s, e) < innerWidth / 18) s.addClass("highlight");
    else s.removeClass("highlight");
  });

