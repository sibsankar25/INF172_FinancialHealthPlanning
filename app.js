const frames = {
  start: document.getElementById("frame-start"),
  howto: document.getElementById("frame-howto"),
  character: document.getElementById("frame-character"),
};

function showFrame(name) {
  Object.entries(frames).forEach(([key, el]) => {
    el.classList.toggle("is-active", key === name);
  });
}

// Frame 1 -> Frame 2
document.getElementById("btn-begin").addEventListener("click", () => showFrame("howto"));

// Frame 2 nav
document.getElementById("btn-howto-back").addEventListener("click", () => showFrame("start"));
document.getElementById("btn-howto-continue").addEventListener("click", () => showFrame("character"));

// Frame 3 nav
document.getElementById("btn-character-back").addEventListener("click", () => showFrame("howto"));
document.getElementById("btn-character-next").addEventListener("click", () =>
  alert("Demo only: next event screen coming soon!")
);

document.getElementById("btn-invest").addEventListener("click", () =>
  alert("Demo only: investing screen coming soon!")
);