/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var elemLeft = canvas.offsetLeft;
var elemTop = canvas.offsetTop;
var totw = 1200;
var toth = 700;
var curstatus = 0;
var takeout = -1;
var purchase = -1;
var takeout_mission = -1;
var purchase_mission = -1;
var starttime = 0;
var curmenu = 0;
const menu = [
  ["더블버거", "치즈버거", "치킨버거", "불고기버거"],
  ["콜라", "제로콜라", "사이다", "오렌지주스"],
  ["치킨너겟", "후렌치후라이", "해시브라운", "치즈스틱"],
];
const imgname = ["burger", "drink", "side"];
const takeoutarr = ["매장에서 먹기", "테이크아웃"];
const purchasearr = ["신용카드", "현금"];
const tabs = ["햄버거", "음료", "사이드", "결제"];
const hamburgermission = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const bag = [
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
];
function drawhline(x, y, l) {
  ctx.beginPath();
  ctx.rect(x, y, l, 3);
  ctx.fillstyle = "#000000";
  ctx.fill();
  ctx.closePath();
}
function drawvline(x, y, l) {
  ctx.beginPath();
  ctx.rect(x, y, 300, l);
  ctx.fillstyle = "#000000";
  ctx.fill();
  ctx.closePath();
}
function init() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
      hamburgermission[i][j]=0;
      bag[i][j]=0;

    }
  }
  takeout=-1;
  purchase=-1;
  starttime = Date.now();
  var rand1 = Math.floor(Math.random() * 4);
  var rand2 = Math.floor(Math.random() * 4);
  while (rand2 == rand1) {
    rand2 = Math.floor(Math.random() * 4);
  }
  hamburgermission[0][rand1] = 2;
  hamburgermission[0][rand2] = 1;
  rand1 = Math.floor(Math.random() * 4);
  hamburgermission[1][rand1] = 3;
  rand1 = Math.floor(Math.random() * 4);
  hamburgermission[2][rand1] = 1;
  takeout_mission = Math.floor(Math.random() * 2);
  purchase_mission = Math.floor(Math.random() * 2);
}
function showburgerimg(i) {
  var img = new Image();
  img.src = "../../images/" + imgname[curmenu] + (i + 1) + ".jpg";
  img.onload = function () {
    ctx.drawImage(
      img,
      500 + Math.floor(i / 2) * 400,
      (i % 2) * 300 + 100,
      200,
      170
    );
  };
}

function draw() {
  ctx.beginPath();
  ctx.fillStyle = "#005511";
  ctx.rect(0, 0, totw, toth);
  ctx.fill();
  ctx.closePath();
  if (curstatus == 0) {
    ctx.beginPath();
    ctx.rect(100, 100, 600, toth - 200);
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
    ctx.fillText("키오스크 연습 게임", 400, 160);
    ctx.textAlign = "left";
    ctx.font = "24px arial";
    ctx.fillText("미션에 나오는 메뉴들을 키오스크에서 주문하세요.", 120, 230);
    ctx.fillText("미션에 나오는 수량, 먹는 장소, 결제 방법대로", 120, 280);
    ctx.fillText("그대로 주문해야 합니다.", 120, 330);
    ctx.fillText("최대한 빨리 주문해보세요!", 120, 380);
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(300, 500, 200, 70);
    ctx.lineWidth = 5;
    ctx.fillStyle = "#00ff00";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.font = "bold 36px arial";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("시작", 400, 540);
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(730, 100, 400, toth - 200);
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
    ctx.fillText("미션", 930, 160);
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
      drawhline(730, 200 + 80 * i, 400);
    }
    var c = 0;
    ctx.font = "24px arial";
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (hamburgermission[i][j]) {
          ctx.fillText(
            menu[i][j] + " " + hamburgermission[i][j] + "개",
            930,
            240 + 80 * c
          );
          c++;
        }
      }
    }
    ctx.fillText(
      takeoutarr[takeout_mission] + ", " + purchasearr[purchase_mission],
      930,
      240 + 80 * c
    );
  } else if (curstatus == 1) {
    ctx.beginPath();
    ctx.rect(0, 0, 400, toth);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#dddddd";
    ctx.fill();
    ctx.closePath();
    ctx.font = "24px arial";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(
      takeoutarr[takeout_mission] + ", " + purchasearr[purchase_mission],
      200,
      40
    );
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
      drawhline(0, 70 + 70 * i, 400);
    }
    ctx.closePath();
    var c = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (hamburgermission[i][j]) {
          console.log(menu[i][j] + " " + hamburgermission[i][j] + "개");
          ctx.beginPath();
          ctx.fillText(
            menu[i][j] + " " + hamburgermission[i][j] + "개",
            200,
            110 + 70 * c
          );
          ctx.closePath();
          c++;
        }
      }
    }
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px arial";
    ctx.fillText("어디서 드시겠습니까?", 800, 70);
    ctx.beginPath();
    ctx.rect(450, 200, 300, 450);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#dddddd";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(850, 200, 300, 450);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#dddddd";
    ctx.fill();
    ctx.closePath();
    var img = new Image();
    img.src = "../../images/inmac.jpg";
    img.onload = function () {
      ctx.drawImage(img, 450, 200, 300, 300);
    };
    var img2 = new Image();
    img2.src = "../../images/takeout.jpg";
    img2.onload = function () {
      ctx.drawImage(img2, 850, 200, 300, 300);
    };
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold 40px arial";
    ctx.fillText("매장에서 먹기", 600, 575);
    ctx.fillText("테이크아웃", 1000, 575);
  } else if (curstatus == 2) {
    ctx.beginPath();
    ctx.rect(0, 0, 400, toth);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#dddddd";
    ctx.fill();
    ctx.closePath();
    
    for(var i=0;i<5;i++)
    {
      ctx.beginPath();
      ctx.fillStyle="#77ff77";
      ctx.rect(0,0,400,350);
      ctx.fill();
      ctx.closePath();
    }
    ctx.font = "24px arial";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(
      takeoutarr[takeout_mission] + ", " + purchasearr[purchase_mission],
      200,
      40
    );
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      drawhline(0, 70 + 70 * i, 400);
    }
    ctx.closePath();
    var c = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (hamburgermission[i][j]) {
          console.log(menu[i][j] + " " + hamburgermission[i][j] + "개");
          ctx.beginPath();
          ctx.fillText(
            menu[i][j] + " " + hamburgermission[i][j] + "개",
            200,
            110 + 70 * c
          );
          ctx.closePath();
          c++;
        }
      }
    }
    ctx.font = "bold 36px arial";
    ctx.fillText("장바구니", 200, 390);
    c = 0;
    ctx.font = "24px arial";
    ctx.textAlign = "left";
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (bag[i][j]) {
          console.log("y");
          console.log(menu[i][j] + " " + bag[i][j] + "개");
          ctx.beginPath();
          ctx.fillText(
            menu[i][j] + " " + bag[i][j] + "개",
            20,
            110 + 70 * (c + 5)
          );
          ctx.closePath();
          c++;
        }
      }
    }
    ctx.textAlign = "center";
    ctx.font = "bold 36px arial";
    for (var i = 0; i < c; i++) {
      ctx.beginPath();
      ctx.rect(200, 432 + 70 * i, 50, 50);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fillStyle = "#00ff00";
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = "#000000";
      ctx.fillText("+", 225, 460 + 70 * i);
      ctx.beginPath();
      ctx.rect(260, 432 + 70 * i, 50, 50);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fillStyle = "#ffff00";
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = "#000000";
      ctx.fillText("-", 284, 457 + 70 * i);
      ctx.beginPath();
      ctx.rect(320, 432 + 70 * i, 50, 50);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fillStyle = "#ff3f3d";
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = "#000000";
      ctx.fillText("x", 345, 457 + 70 * i);
    }
    for (var i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.rect(404 + 200 * i, 0, 200, 70);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      ctx.stroke();
      if (i != 3) ctx.fillStyle = "#cccccc";
      else ctx.fillStyle = "#ff3333";
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = "#000000";
      ctx.fillText(tabs[i], 404 + 200 * i + 100, 37);
    }
    for (var i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.rect(450 + 400 * Math.floor(i / 2), (i % 2) * 300 + 100, 300, 250);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fillStyle = "#cccccc";
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.rect(450 + 400 * Math.floor(i / 2), (i % 2) * 300 + 100, 300, 170);
      ctx.fill();
      ctx.closePath();
      showburgerimg(i);
      ctx.fillStyle = "#000000";
      ctx.fillText(
        menu[curmenu][i],
        600 + 400 * Math.floor(i / 2),
        (i % 2) * 300 + 310
      );
    }
  } else if (curstatus == 3) {
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px arial";
    ctx.textAlign = "center";
    ctx.fillText("이렇게 주문하시겠습니까?", 600, 50);
    ctx.textAlign = "left";
    ctx.font = "24px arial";
    var c = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (bag[i][j]) {
          ctx.beginPath();
          ctx.fillStyle = "#dddddd";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 3;
          ctx.fillRect(50, 100 + 70 * c, 250, 70);
          ctx.strokeRect(50, 100 + 70 * c, 250, 70);
          ctx.closePath();
          console.log("y");
          console.log(menu[i][j] + " " + bag[i][j] + "개");
          ctx.beginPath();
          ctx.fillStyle = "#000000";
          ctx.fillText(menu[i][j] + " " + bag[i][j] + "개", 70, 135 + 70 * c);
          ctx.closePath();
          c++;
        }
      }
    }
    ctx.beginPath();
    ctx.rect(400, 100, 350, 450);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#dddddd";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(800, 100, 350, 450);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#dddddd";
    ctx.fill();
    ctx.closePath();
    var img = new Image();
    img.src = "../../images/card.jpg";
    img.onload = function () {
      ctx.drawImage(img, 400, 100, 350, 300);
    };
    var img2 = new Image();
    img2.src = "../../images/money.jpg";
    img2.onload = function () {
      ctx.drawImage(img2, 800, 100, 350, 300);
    };
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold 40px arial";
    ctx.fillText("카드 결제", 575, 480);
    ctx.fillText("현금 결제", 975, 480);
    ctx.beginPath();
    ctx.rect(50, 500, 200, 100);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = "#ff7777";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.fillText("뒤로", 150, 550);
  } else if (curstatus == 4) {
    ctx.beginPath(0);
    ctx.fillStyle = "#dddddd";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.rect(100, 100, 400, 420);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold 36px arial";
    ctx.fillText("미션", 300, 140);
    ctx.font = "24px arial";
    ctx.fillText(
      takeoutarr[takeout_mission] + ", " + purchasearr[purchase_mission],
      300,
      210
    );
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      drawhline(100, 170 + 70 * i, 400);
    }
    ctx.closePath();
    var c = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (hamburgermission[i][j]) {
          console.log(menu[i][j] + " " + hamburgermission[i][j] + "개");
          ctx.beginPath();
          ctx.fillText(
            menu[i][j] + " " + hamburgermission[i][j] + "개",
            300,
            280 + 70 * c
          );
          ctx.closePath();
          c++;
        }
      }
    }
    ctx.beginPath(0);
    ctx.fillStyle = "#dddddd";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.rect(700, 100, 400, 420);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold 36px arial";
    ctx.fillText("주문", 900, 140);
    ctx.font = "24px arial";
    ctx.fillText(takeoutarr[takeout] + ", " + purchasearr[purchase], 900, 210);
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      drawhline(700, 170 + 70 * i, 400);
    }
    ctx.closePath();
    var c = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (bag[i][j]) {
          console.log(menu[i][j] + " " + bag[i][j] + "개");
          ctx.beginPath();
          ctx.fillText(menu[i][j] + " " + bag[i][j] + "개", 900, 280 + 70 * c);
          ctx.closePath();
          c++;
        }
      }
    }
    var success=1;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (bag[i][j]!=hamburgermission[i][j]) {
          success=0;
        }
      }
    }
    if(takeout!=takeout_mission||purchase!=purchase_mission)
    success=0;
    ctx.fillStyle="#ffffff";
    ctx.font="bold 48px arial";
    if(success==0)
    {
      ctx.fillText("실패하셨습니다",600,50);
    }
    else
    {
      ctx.fillText("성공하셨습니다",600,50);
    }
    ctx.lineWidth=5;
    ctx.fillStyle="#33ff33";
    ctx.beginPath();
    ctx.rect(800,550,200,100);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle="#000000";
    ctx.font="bold 30px arial";
    ctx.fillText("재시작",900,600);
    ctx.fillStyle="#ffffff";
    ctx.fillText("시간 : "+(Math.floor((Date.now()-starttime)/100)/10)+"초",300,600);
  }
}
canvas.addEventListener("click", function (event) {
  var x =event.clientX-canvas.getBoundingClientRect().left;
  var y = event.clientY-canvas.getBoundingClientRect().top;
  console.log(x, y);
  if (curstatus == 0) {
    if (x > 290 && x < 510 && y > 490 && y < 580)
    {
      starttime = Date.now();
      curstatus = 1;
    } 
  } else if (curstatus == 1) {
    if (x > 440 && x < 760 && y > 90 && y < 560) {
      curstatus = 2;
      takeout = 0;
    }
    if (x > 840 && x < 1160 && y > 90 && y < 560) {
      curstatus = 2;
      takeout = 1;
    }
  } else if (curstatus == 2) {
    if (y < 80 && x > 400 && x <= 1000) {
      curmenu = Math.floor((x - 400) / 200);
    }
    if (x < 400 && x >= 200) {
      const menus = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
          if (bag[i][j]) {
            menus.push([i, j]);
          }
        }
      }
      console.log(menus);
      for (var i = 0; i < menus.length; i++) {
        if (y >= 430 + 70 * i && y <= 484 + 70 * i) {
          if (x >= 200 && x <= 250) {
            bag[menus[i][0]][menus[i][1]]++;
          }
          if (x >= 260 && x <= 310) {
            bag[menus[i][0]][menus[i][1]]--;
          }
          if (x >= 320 && x <= 370) {
            bag[menus[i][0]][menus[i][1]] = 0;
          }
        }
      }
    }
    if (x > 400 && y >= 80) {
      const menus = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
          if (bag[i][j]) {
            menus.push([i, j]);
          }
        }
      }
      for (var i = 0; i < 4; i++) {
        if (
          x >= 450 + 400 * Math.floor(i / 2) &&
          x <= 750 + 400 * Math.floor(i / 2) &&
          y >= (i % 2) * 300 + 100 &&
          y <= (i % 2) * 300 + 350
        ) {
          console.log(i);
          if (menus.length < 4 || bag[curmenu][i]) {
            bag[curmenu][i]++;
          }
        }
      }
    }
    if (x > 1000 && y < 80) {
      curstatus = 3;
    }
  } else if (curstatus == 3) {
    if (x > 40 && x < 250 && y > 490 && y < 610) {
      curstatus = 2;
    }
    if (x > 390 && x < 760 && y > 90 && y < 560) {
      purchase = 0;
      curstatus = 4;
    }
    if (x > 790 && x < 1160 && y > 90 && y < 560) {
      purchase = 1;
      curstatus = 4;
    }
    
  }
  else if(curstatus==4)
    {
      console.log('x');
      if(x>790&&x<1010&&y>540&&y<660)
      {
        
        init();
        curstatus=0;
      }
    }
  ctx.clearRect(0, 0, totw, toth);
  draw();
});
init();
draw();
