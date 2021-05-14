// router.js

export const router = {};

const body = document.querySelector("body");
const title = document.querySelector("header").querySelector("h1");

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function (state) {
  if (state === "home") {
    history.pushState({ page: "home" }, "", "/Lab7");
    body.className = "";
    title.innerHTML = "Journal Entries";
  } else if (state === "settings") {
    history.pushState({ page: "settings" }, "", "/Lab7#settings");
    title.innerHTML = "Settings";
    body.className = "settings";
  } else if (typeof state === "object") {
    body.removeChild(document.querySelector("entry-page"));
    body.appendChild(document.createElement("entry-page"));
    history.pushState({ page: `Entry ${state.num}` }, "", `/Lab7#entry${state.num}`);
    body.className = "single-entry";
    document.querySelector("entry-page").entry = state.data;
    title.innerHTML = `Entry ${state.num}`;
  }
};
