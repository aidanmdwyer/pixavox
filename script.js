let gridScale;
let gridX;
let gridY;
const MAX_SCALE = 100;
const MIN_SCALE = 5;
const LWH = 20;
const root = document.querySelector(":root");
const toolsWindow = document.getElementById("tools-window");
const texturesWindow = document.getElementById("textures-window");
const canvasWindow = document.getElementById("canvas-window");
const pixelGrid = document.getElementById("pixel-grid");
const menubar = document.getElementsByClassName("menubar")[0];
const menubarHeight = getComputedStyle(menubar).height.slice(0, -2);
let scaledToFit = true;

setUpGrid(LWH, LWH, LWH);

canvasWindow.addEventListener("wheel", ({deltaY: zoom, clientX: mouseX, clientY: mouseY}) => {
    //scale
    scaledToFit = false;
    const oldScale = gridScale;
    gridScale -= (zoom * 0.0005 * gridScale); // * by gridScale to make zooming uniform, otherwise the closer you get the slower you zoom
    gridScale = Math.min(Math.max(gridScale, MIN_SCALE), MAX_SCALE);
    setGridScale(gridScale);
    
    //position
    const scaleRatio = gridScale / oldScale;
    let gridStyle = getComputedStyle(pixelGrid);
    let zoomX = Math.min(Math.max(mouseX, gridX - gridStyle.width.slice(0, -2)/2), gridX + gridStyle.width.slice(0, -2)/2);
    let zoomY = Math.min(Math.max(mouseY, gridY - gridStyle.height.slice(0, -2)/2), gridY + gridStyle.height.slice(0, -2)/2)
    gridX = zoomX - ((zoomX - gridX) * scaleRatio);
    gridY = zoomY - ((zoomY - gridY) * scaleRatio);
    setGridPosition(gridY, gridX);
});

window.addEventListener("resize", function(event){
    if(scaledToFit) scaleGridToFit();
});

function setUpGrid(l, w, h) {
    pixelGrid.innerHTML = "";

    root.style.setProperty("--model-dimensions-length", l);
    root.style.setProperty("--model-dimensions-width", w);
    root.style.setProperty("--model-dimensions-height", h);

    scaleGridToFit();

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

function scaleGridToFit() {
    scaledToFit = true;

    gridX = document.body.clientWidth / 2;
    gridY = (document.body.clientHeight / 2) + menubarHeight / 2;
    setGridPosition(gridY, gridX);
    
    let maxWidth = document.body.clientWidth - getComputedStyle(texturesWindow).width.slice(0, -2) - getComputedStyle(toolsWindow).width.slice(0, -2);
    let maxHeight = document.body.clientHeight - menubarHeight;
    gridScale = Math.min(maxWidth, maxHeight) / 20;
    setGridScale(gridScale);
}

function setGridPosition(top, left) {
    root.style.setProperty("--grid-y", top);
    root.style.setProperty("--grid-x", left);
}

function setGridScale(scale) {
    root.style.setProperty("--grid-scale", scale);
}