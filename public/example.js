"use strict";

const examples = [
  "https://www.businessinsider.com/sai",
  "https://github.com/e9x",
  "https://www.google.com/",
];

/**
 * @type {HTMLInputElement|null}
 */
const hideExample = document.getElementById("hide-example");
if (!hideExample)
  throw new TypeError("Unable to find element with ID 'hideExample'");
hideExample.checked = localStorage.hideExample === "1";

hideExample.addEventListener("click", () => {
  localStorage.hideExample = hideExample.checked ? "1" : "0";
  location.reload();
});

// example is defined in form.js
if (!hideExample.checked)
  example.src = examples[~~(Math.random() * examples.length)];
