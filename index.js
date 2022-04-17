const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
let ctx;
document.addEventListener("DOMContentLoaded", init);


function draw(){
    const canvas = document.getElementById("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "hsl(262, 100%,30%)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const nextHeight = () => Math.random() * CANVAS_HEIGHT;
    ctx.fillStyle = "hsl(262, 80%, 10%)";
    ctx.beginPath();
    const startHeight = nextHeight();
    ctx.moveTo(0, startHeight);
    for(let i=0; i<=5; i++){
        ctx.lineTo(i * CANVAS_WIDTH / 5, nextHeight());
    }
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.lineTo(0, CANVAS_HEIGHT);
    ctx.lineTo(0, startHeight);
    ctx.fill();
}

function init(){
    const reloadButton = document.getElementById("reload");
    reloadButton.addEventListener("click", draw);
    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", save);
    draw();
}

function save(){
    const canvas = document.getElementById("canvas");
    canvas.toBlob( (b) => {
        const a = document.createElement("a");
        const url = URL.createObjectURL(b);
        a.href = url;
        a.download = "wallpaper";
        a.dispatchEvent(new MouseEvent("click"));
    }, "image/png");
    
}
