let scale = 5;
const MAX_SCALE = 100;
const MIN_SCALE = 5;
const WHD = 20;
const root = document.querySelector(":root");
const pixelGrid = document.getElementById("pixel-grid");
const toolsWindow = document.getElementById("tools-window");
const texturesWindow = document.getElementById("textures-window");
const menubar = document.getElementsByClassName("menubar")[0];
let scaledToFit = true;

setUpCanvas(WHD, WHD, WHD);

document.getElementById("canvas-window").addEventListener("wheel", ({deltaY}) => {
    scaledToFit = false;
    scale += (deltaY/50);
    if(scale < MIN_SCALE) {
        scale = MIN_SCALE;
    }
    else if(scale > MAX_SCALE) {
        scale = MAX_SCALE;
    }
    root.style.setProperty("--canvas-scale", scale);
});

window.addEventListener("resize", function(event){
    if(scaledToFit) scaleCanvasToFit();
});

function setUpCanvas(w, h, d) {
    pixelGrid.innerHTML = "";

    root.style.setProperty("--model-width", w);
    root.style.setProperty("--model-height", h);
    root.style.setProperty("--model-depth", d);

    scaleCanvasToFit();

    for(let i = 0; i < w * h; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        if(Math.random() < 0.25) {
            pixel.classList.add("pixel-disabled");
        }
        if(Math.random() < 0.5) {
            pixel.style.backgroundColor = "rgb(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ")";
        }
        pixelGrid.appendChild(pixel);
    }
}

function scaleCanvasToFit() {
    scaledToFit = true;
    let maxWidth = getComputedStyle(document.body).width.slice(0, -2) - getComputedStyle(texturesWindow).width.slice(0, -2) - getComputedStyle(toolsWindow).width.slice(0, -2);
    let maxHeight = getComputedStyle(document.body).height.slice(0, -2) - getComputedStyle(menubar).height.slice(0, -2);
    scale = Math.min(maxWidth, maxHeight) / 20;
    root.style.setProperty("--canvas-scale", scale);
}