"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("search-engine");
/**
 * @type {HTMLDivElement}
 */
const examples = document.getElementById("examples");
/**
 * @type {HTMLElement}
 */
const main = document.getElementById("main");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = search(address.value, searchEngine.value);

  // free up some memory
  examples.remove();

  main.src = url;
  main.hidden = false;

  // add a class to hide any overflow/scrollbars
  document.body.classList.add("focus");
});
