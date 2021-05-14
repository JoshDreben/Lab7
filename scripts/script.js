// script.js

import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const settingBtn = document.querySelector("img[alt=settings]");
const titleBtn = document.querySelector("h1");

settingBtn.addEventListener("click", () => {
  if (document.location.hash != "#settings") {
    setState("settings");
  } else {
    setState("home");
  }
});

// Make sure you register your service worker here too

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

titleBtn.addEventListener("click", () => {
  setState("home");
});

document.addEventListener("DOMContentLoaded", () => {
  setState("home");
  fetch("https://cse110lab6.herokuapp.com/entries")
    .then((response) => response.json())
    .then((entries) => {
      entries.forEach((entry) => {
        let newPost = document.createElement("journal-entry");
        newPost.entry = entry;
        newPost.addEventListener("click", () => {
          setState({ num: entries.indexOf(entry) + 1, data: entry });
        });
        document.querySelector("main").appendChild(newPost);
      });
    });
});

window.addEventListener("popstate", (event) => {
  setState(event.state.page);
});
