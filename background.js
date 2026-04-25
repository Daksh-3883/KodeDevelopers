// ======================================================
// BACKGROUND.JS
// Shared animated hex border background
// ======================================================

const canvas = document.createElement("canvas");
canvas.id = "bg-canvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let w, h;
let cols, rows;
let time = 0;

const mobile = window.innerWidth < 768;
const lowEnd = navigator.hardwareConcurrency &&
               navigator.hardwareConcurrency <= 4;

const hexSize = mobile ? 55 : lowEnd ? 45 : 35;

function resizeCanvas(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  cols = Math.ceil(w / (hexSize * 1.5));
  rows = Math.ceil(h / (hexSize * 1.7));
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


function drawHex(x,y,size,r,g,b,a){

  ctx.beginPath();

  for(let i=0;i<6;i++){
    const angle = (Math.PI/3) * i;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);

    if(i===0) ctx.moveTo(px,py);
    else ctx.lineTo(px,py);
  }

  ctx.closePath();
  ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
  ctx.lineWidth = 1.1;
  ctx.stroke();
}


function animate(){

  ctx.clearRect(0,0,w,h);

  time += lowEnd ? 0.004 : 0.008;

  const edge = w * (mobile ? 0.18 : 0.24);

  for(let i=0;i<cols;i++){

    for(let j=0;j<rows;j++){

      const x = i * hexSize * 1.5;
      const y = j * hexSize * 1.7 + (i % 2 ? hexSize * 0.85 : 0);

      const left = x;
      const right = w - x;

      let alpha = 0;

      if(left < edge){
        alpha = 1 - left / edge;
      }else if(right < edge){
        alpha = 1 - right / edge;
      }

      if(alpha <= 0) continue;

      alpha = Math.pow(alpha,1.5) * 0.85;

      const r = Math.floor(110 + 145 * Math.sin(time + i * 0.25));
      const g = Math.floor(110 + 145 * Math.sin(time + j * 0.25));
      const b = Math.floor(110 + 145 * Math.sin(time));

      drawHex(x,y,hexSize,r,g,b,alpha);
    }
  }

  requestAnimationFrame(animate);
}

animate();
