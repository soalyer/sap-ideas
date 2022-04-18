var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pet = new Image();
pet.src = "assets/pet_template.png";
var food = new Image();
food.src = "assets/food_template.png";
var dice = new Image();
function outline(text, x, y) {
    ctx.font = "65px sap-font";
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeText(text, x, y);
}
var whiteOutline = true;
/* function by @crazy2b */
/* https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element */
function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

const offsets = [[5,0], [3.53,3.53], [0,5], [-3.53, 3.53],[-5,0],[-3.53,-3.53],[0,-5],[3.53,-3.53],[2.24,4.47],[4.47,2.24],[-2.24,-4.47],[-4.47,-2.24],[-2.24,4.47],[-4.47,2.24],[2.24,-4.47],[4.47,-2.24]]
function draw(timestamp){
    if (document.getElementById("option").checked) {
        ctx.drawImage(pet, 0, 0);

        ctx.font = "30px sap-font";
        ctx.textAlign = "center";
        var attack = document.getElementById('attack')
        outline(attack.value, 251, 673);
        var health = document.getElementById('health')
        outline(health.value, 345, 673);
    }
    else {
        ctx.drawImage(food, 0, 0);
    }
    var name = document.getElementById('name');
    ctx.fillStyle = "#FE4D1A";
    ctx.font = "42px sap-font";
    let right = ctx.measureText(name.value.toUpperCase().substring(1)).width;
    ctx.font = "52px sap-font";
    let left = ctx.measureText(name.value.toUpperCase().charAt(0)).width;
    ctx.font = "42px sap-font";
    ctx.fillText(name.value.toUpperCase().substring(1),300+left/2,80);
    
    ctx.font = "52px sap-font";
    ctx.fillText(name.value.toUpperCase().charAt(0),300-right/2,80);

    var icon = document.getElementById("image");
    if (document.getElementById("font").checked) {
        ctx.font = "144px noto";
    }
    else {
        ctx.font = "144px twemoji"
    }
    if (whiteOutline) {
        ctx.shadowColor = "white";
        ctx.shadowBlur = 1;
        for (i=0; i < offsets.length; i++) {
            ctx.shadowOffsetX = offsets[i][0]*2.5
            ctx.shadowOffsetY = offsets[i][1]*2.5
            ctx.fillText(icon.value, 300, 570);
        } 
        ctx.shadowColor = "black";
        for (i=0; i < offsets.length; i++) {
            ctx.shadowOffsetX = offsets[i][0]*1.25
            ctx.shadowOffsetY = offsets[i][1]*1.25
            ctx.fillText(icon.value, 300, 570);
        } 
    }
    else {
        ctx.fillText(icon.value, 300, 570);
    }
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    var tier = document.getElementById('tier');
    if (tier.value > 0 && tier.value < 7) {
        dice.src = "assets/Dice_" + tier.value + ".png";
    }
    else {
        dice.src = "assets/Dice_1.png";
    }
    ctx.drawImage(dice, 194, 360);
    ctx.drawImage(dice, 272, 95, 50, 50);
    ctx.fillStyle = "black"

    var trigger = document.getElementById('trigger').value == "" ? "" : document.getElementById('trigger').value + " ➞ ";
    ctx.font = "bold 36px desc-font"
    let fleft = ctx.measureText(trigger).width
    ctx.font = "36px desc-font"
    var desc = document.getElementById('description');

    let lines = getLines(ctx, trigger + desc.value, 500);

    let line1 = lines[0].split("➞");
    line1 = line1[line1.length-1];
    lines.shift()
    let fright = ctx.measureText(line1).width
    ctx.font = "bold 36px desc-font"
    ctx.fillText(trigger, 300-fright/2, 180);
    ctx.font = "36px desc-font"
    ctx.fillText(line1, 300+fleft/2, 180);
    lines.forEach((line,index) => ctx.fillText(line, 300, 220+index*40));
    requestAnimationFrame(draw)
    

}
requestAnimationFrame(draw)

