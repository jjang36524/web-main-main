/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var totw = 1200;
var toth = 700;
var imgw = 120;
var imgh = 187;
var elemLeft = canvas.offsetLeft;
var elemTop = canvas.offsetTop;
var papers = [];
var bef = [-1, -1];
var totstatus = 0;
var totalclick = 0;
var suc = 0;
const offcanvas = document.createElement("canvas");
offcanvas.width = totw;
offcanvas.height = toth;
var octx = (offcanvas.ctx = offcanvas.getContext("2d"));

class Queue {
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    return this._arr.shift();
  }
}
function hideimg(i, j) {
  var img = new Image();
  img.src = "../../images/gostop" + 0 + ".jpg";
  img.onload = function () {
    octx.drawImage(img, papers[i][j].x, papers[i][j].y, imgw, imgh);
  };
}
const queue = new Queue();
function init() {
  bef[0] = -1;
  bef[1] = -1;
  totstatus = 0;
  totalclick = 0;
  suc = 0;
  while (queue._arr.length > 0) {
    var t = queue.pop();
  }
  for (var i = 0; i < 3; i++) {
    papers[i] = [];
    for (var j = 0; j < 6; j++) {
      papers[i][j] = {
        x: 40 + j * 200,
        y: i * 210 + 47,
        status: 0,
        type: Math.floor((i * 6 + j) / 2) + 1,
      };
    }
  }
  for (var i = 0; i < 100; i++) {
    const fi = Math.floor(Math.random() * 3);
    const fj = Math.floor(Math.random() * 6);
    const si = Math.floor(Math.random() * 3);
    const sj = Math.floor(Math.random() * 6);
    var temp = papers[fi][fj].type;
    papers[fi][fj].type = papers[si][sj].type;
    papers[si][sj].type = temp;
  }
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
      hideimg(i, j);
    }
  }
}

function showimg(i, j) {
  var img = new Image();
  img.src = "../../images/gostop" + papers[i][j].type + ".png";
  img.onload = function () {
    ctx.drawImage(img, papers[i][j].x, papers[i][j].y, imgw, imgh);
  };
}

function paper_draw() {
  ctx.drawImage(offcanvas, 0, 0);
  c = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
      if (papers[i][j].status == 1) showimg(i, j);
      if (papers[i][j].status == 2) {
        octx.clearRect(papers[i][j].x, papers[i][j].y, imgw, imgh);
      }
    }
  }
}
function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}
function notdraw() {
  if (totstatus == 0) {
    ctx.beginPath();
    ctx.rect(0, 0, totw, toth);
    ctx.fillStyle = "#e0b88a";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(100, 100, totw - 200, toth - 200);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#dddddd";
    ctx.fill();
    ctx.closePath();
    ctx.font = "bold 48px arial";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("짝맞추기 게임", 600, 160);
    ctx.textAlign = "left";
    ctx.font = "24px arial";
    ctx.fillText("카드를 클릭하면 카드의 뒷면이 보이게 됩니다.", 120, 230);
    ctx.fillText(
      "다른 하나를 클릭하였을 때, 뒷면이 같으면 두 카드는 사라집니다.",
      120,
      280
    );
    ctx.fillText(
      "뒷면이 다르다면, 잠깐 카드를 보여준 뒤 둘 다 다시 뒤집어집니다.",
      120,
      330
    );
    ctx.fillText("최대한 적게 클릭하여 모든 카드들을 맞춰보세요!", 120, 380);
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(500, 500, 200, 70);
    ctx.lineWidth = 5;
    ctx.fillStyle = "#00ff00";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.font = "bold 36px arial";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("시작", 600, 540);
    ctx.closePath();
  } else if (totstatus == 2) {
    ctx.beginPath();
    ctx.rect(0, 0, totw, toth);
    ctx.fillStyle = "#e0b88a";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(100, 100, totw - 200, toth - 200);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#dddddd";
    ctx.fill();
    ctx.closePath();
    ctx.font = "bold 48px arial";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("짝맞추기 게임", 600, 160);
    ctx.font = "30px arial";
    ctx.fillText("총 클릭 횟수는 " + totalclick + " 번입니다.", 600, 360);
    ctx.beginPath();
    ctx.rect(400, 500, 400, 70);
    ctx.lineWidth = 5;
    ctx.fillStyle = "#00ff00";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.font = "bold 36px arial";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("다시 시작", 600, 540);
    ctx.closePath();
  }
  const nqueue = new Queue();
  var drw = 0;
  while (queue._arr.length > 0) {
    var t = queue.pop();
    if (t.time <= Date.now()) {
      papers[t.x][t.y].status = t.status;
      drw = 1;
    } else {
      nqueue.push(t);
    }
  }

  while (nqueue._arr.length > 0) {
    queue.push(nqueue.pop());
  }
  if (drw == 1) draw();
  requestAnimationFrame(notdraw);
}
function draw() {
  ctx.beginPath();
  ctx.rect(0, 0, totw, toth);
  ctx.fillStyle = "#e0b88a";
  ctx.fill();
  ctx.closePath();
  paper_draw();
}
canvas.addEventListener("click", function (event) {
  var time1 = Date.now();
  var x =event.clientX-canvas.getBoundingClientRect().left;
  var y = event.clientY-canvas.getBoundingClientRect().top;
  if (totstatus != 1) {
    if (
      x > 490 - totstatus * 50 &&
      x < 710 + totstatus * 50 &&
      y > 490 &&
      y < 610
    ) {
      init();
      totstatus = 1;
      draw();
    }

    return;
  }
  if (queue._arr.length > 0) return;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
      if (
        x >= papers[i][j].x &&
        y >= papers[i][j].y &&
        x <= papers[i][j].x + imgw &&
        y <= papers[i][j].y + imgh
      ) {
        if (papers[i][j].status == 2) continue;
        totalclick = totalclick + 1;
        if (bef[0] == -1) {
          bef[0] = i;
          bef[1] = j;
          papers[i][j].status = 1;
        } else {
          if (bef[0] == i && bef[1] == j) continue;
          if (papers[bef[0]][bef[1]].type == papers[i][j].type) {
            suc = suc + 1;
            papers[i][j].status = 1;
            draw();
          } else {
            papers[i][j].status = 1;
            draw();
            queue.push({
              time: Date.now() + 1500,
              x: bef[0],
              y: bef[1],
              status: 0,
            });
            queue.push({ time: Date.now() + 1500, x: i, y: j, status: 0 });
          }
          bef[0] = -1;
          bef[1] = -1;
        }
      }
    }
  }
  draw();
  if (suc == 9) {
    totstatus = 2;
  }
  console.log(Date.now() - time1);
});
init();
totstatus = 0;
requestAnimationFrame(notdraw);
