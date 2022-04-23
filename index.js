let CANVAS_WIDTH;
let CANVAS_HEIGHT;
let drawStyle = "waves";

const styles = {
    waves: drawWaves,
    circles: drawCircles
};

document.addEventListener("DOMContentLoaded", init);

const randomFloat = (lb, ub) => Math.random() * (ub - lb) +lb;
const randomInt = (lb, ub) => Math.floor(randomFloat(lb,ub));
const randomInc = (lb, ub) => randomInt(lb,ub) * ((Math.random() > 0.5) ? 1 : -1);


function randomPalette(){
    return {
        hue : randomInt(0,360),
        sat : randomInt(20,80),
        light : randomInt(20,80),
        lightInc : randomInc(2,16),
        satInc : randomInc(2,16)
    };
}

function draw(){
    const canvas = document.getElementById("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d");
    const palette = randomPalette();
    console.log(palette);

    styles[drawStyle](ctx, palette);

}

function drawWaves(ctx, palette) {
    const {hue,sat,light,lightInc,satInc} = palette;
    const startHeight = randomFloat(0, CANVAS_HEIGHT / 2);
    const xInc = randomInc(16,128);
    const yInc = randomInt(16,128);
    const ampl = randomInt(32,128);
    console.log({startHeight,xInc,yInc,ampl});
    const segments = 200;
    const wl = CANVAS_WIDTH / ( 5 + ( 15 * Math.random() ) );
    ctx.fillStyle = `hsl(${hue}, ${sat}%,${light}%)`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


    const drawLine = (offset) => {
        ctx.fillStyle = `hsl(${hue}, ${sat + satInc * offset}%,${light + lightInc * offset}%)`;
        ctx.beginPath();
        const myHeight = yInc * offset + ( ampl * Math.sin( offset * xInc / wl ) );
        ctx.moveTo(0, myHeight);
        for(let i=0; i<=segments; i++){
            const x = i * CANVAS_WIDTH / segments;
            ctx.lineTo( x , myHeight + ( ampl * Math.sin( (x + xInc * offset) / wl ) ) );
        }
        ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.lineTo(0, CANVAS_HEIGHT);
        ctx.lineTo(0, startHeight);
        ctx.fill();    
    };

    for(let i = 0; i <= 10; i++){
        drawLine(i);
    }
}

function drawCircles(ctx, palette){
    const {hue,sat,light,lightInc,satInc} = palette;
    const nCircles = randomInt(3,6);
    const xInc = randomInc(0,32);
    const yInc = randomInc(0,32);
    
    ctx.fillStyle = `hsl(${hue}, ${sat}%,${light}%)`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const drawRings = () => {
        const x = randomInt(0,CANVAS_WIDTH);
        const y = randomInt(0,CANVAS_HEIGHT);
        const radiusInc = randomInt(12,64);
        const nRings = randomInt(2,10);
        const radius = randomInt(16,128);
        for(let i = 0; i < nRings; i++){
            ctx.beginPath();
            ctx.arc(x + i * xInc,y + i * yInc, radius + (nRings - i) * radiusInc, 0, 2 * Math.PI);
            ctx.fillStyle = `hsl(${hue}, ${sat + satInc * (i + 1)}%,${light + lightInc * (i + 1)}%)`;
            ctx.fill();
        }
    };

    for(let i = 0; i< nCircles; i++){
        drawRings();
    };
    
}

function styleChanged(){
    const style = document.getElementById("style").value;
    drawStyle = style;
    draw();
}

function init(){
    CANVAS_WIDTH = window.screen.width || 1920;
    CANVAS_HEIGHT = window.screen.height || 1080;
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
