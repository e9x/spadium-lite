"use strict";

/**
 * @type {HTMLFormElement|null}
 */
const form = document.getElementById("form");
if (!form) throw new TypeError("Unable to find element with ID 'form'");
/**
 * @type {HTMLInputElement|null}
 */
const address = document.getElementById("address");
if (!address) throw new TypeError("Unable to find element with ID 'address'");
/**
 * @type {HTMLInputElement|null}
 */
const searchEngine = document.getElementById("search-engine");
if (!searchEngine)
  throw new TypeError("Unable to find element with ID 'search-engine'");
const example = document.getElementById("example");
if (!example) throw new TypeError("Unable to find element with ID 'example'");
const main = document.getElementById("main");
if (!main) throw new TypeError("Unable to find element with ID 'main'");

address.value = localStorage.cachedAddress || "google.com";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.cachedAddress = address.value;

  const url = search(address.value, searchEngine.value);

  // free up some memory
  example.remove();

  main.src = url;
  main.hidden = false;

  // add a class to hide any overflow/scrollbars
  document.body.classList.add("focus");
});
