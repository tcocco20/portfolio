const elements = mapTo(".name", ".subtitle", ".landing-page"),
  [title, subtitle, landing] = elements;

const makeSpan = (...els) => els.forEach((el) => 
  el.cutText().build(...[...el.data].map((l) => ({ tag: "span", innerText: l }))));

export const initLanding = () => {
  makeSpan(title, subtitle);
  landing.addEventListener("mousemove", checkDistance);
};

const checkDistance = (e) => 
  $$(".title span").forEach((s) => {
    if (calcDistance(s, e) < innerWidth / 18) s.addClass("highlight");
    else s.removeClass("highlight");
  });

