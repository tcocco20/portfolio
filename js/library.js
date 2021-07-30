const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const mapTo = (...elements) =>
  elements.map((el) =>
    el[0] === "*" && el[1] === "*" ? $$(el.split("**")[1]) : $(el)
  );

const calcDistance = (element, event) => {
  event = event ?? window.event;
  element = element.getBoundingClientRect();
  return Math.floor(
    Math.sqrt(
      (event.clientX - (element.left + element.width / 2)) ** 2 +
        (event.clientY - (element.top + element.height / 2)) ** 2
    )
  );
};

const Rand = {
  num: Math.random,
  between: (max, min = 0, round = false, inclusive = false) => {
    let num = Math.random() * (max - min) + min;
    if (inclusive && round) num = Math.round(num);
    else if (round) num = Math.floor(num);
    return num;
  },
  choice: (...options) => {
    options = options.flat();
    return options[Math.floor(Math.random() * options.length)];
  },
};

Element.prototype.$ = function (element) {
  return this.querySelector(element);
};

Element.prototype.$$ = function (element) {
  return this.querySelectorAll(element);
};

Element.prototype.cutText = function () {
  this.data = this.innerText;
  this.innerText = "";
  return this;
};

Element.prototype.build = function (...elements) {
  const parent = this;

  elements = elements.map((el) => {
    let element;
    if (typeof el === "string") {
      element = document.createElement(el);
      parent.append(element);
    } else {
      element = document.createElement(el.tag);
      delete el.tag;
      Object.keys(el).forEach((key) => {
        if (key === "style")
          Object.keys(el[key]).forEach((p) => (element.style[p] = el.style[p]));
        else element[key] = el[key];
      });
      parent.append(element);
    }
    return element;
  });
  return [parent, ...elements];
};

Element.prototype.addClass = function (...classes) {
  this.classList.add(classes);
  return this;
};

Element.prototype.removeClass = function (...classes) {
  this.classList.remove(classes);
  return this;
};

Element.prototype.hasClass = function (classes, all = true) {
  if (typeof classes === "string") classes = classes.split(" ");
  if (all) return classes.every((c) => this.classList.contains(c));
  return classes.some((c) => this.classList.contains(c));
};

Element.prototype.size = function (size) {
  if (!isNaN(+size.toString()[size.toString().length - 1])) size += "px";

  this.style.width = size;
  this.style.height = size;
};

Node.prototype.on = function (events, callback) {
  if (typeof events === "string") events = events.split(" ");
  events.forEach((e) => this.addEventListener(e, callback));
};

Array.prototype.pop = function (number = 1) {
  const ri = this.splice(-number, number);
  return number === 1 ? ri[0] : ri;
};
