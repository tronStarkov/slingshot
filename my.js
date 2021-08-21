var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

var pressBall = false
var shot = false

var drawBack = function(){
    context.fillStyle='lightgreen';
    context.fillRect(0, 0, 1000, 490);
    
    context.fillStyle='gray';
    context.fillRect(0, 490, 1000, 10);

    context.strokeStyle='saddlebrown';
    context.lineWidth=10;
    context.lineCap='round';
    
    context.beginPath();
    context.moveTo(200, 490);
    context.lineTo(200, 450);
    context.lineTo(190, 420);
    context.moveTo(200, 450);
    context.lineTo(210, 400);
    context.stroke();    
}

class Ball{
    constructor(x, y){
        this.x = x
        this.y = y 
        
        this.addX = 3
        this.addY = 0
        this.tens = 0

        this.rubJoinX = x - 15
        this.rubJoinUpY = y - 10
        this.rubJoinMidY = y
        this.rubJoinDownY = y + 10
    }

    drawBall(){
        if (shot === true){
            this.x += this.addX + this.tens * 0.05
            this.y += this.addY

            this.addY += 0.02

            if (this.x > 190 && this.x < 210){
                this.rubJoinX =  this.x - 15
                this.rubJoinUpY =  this.y - 10
                this.rubJoinMidY =  this.y
                this.rubJoinDownY =  this.y + 10
            }
        }

        context.strokeStyle='darkslategray';
        context.lineWidth=3;    
        
        context.beginPath();
        context.moveTo(210, 400);
        context.lineTo(this.rubJoinX, this.rubJoinUpY);
        
        context.arc(this.rubJoinX, this.rubJoinMidY, 10, 3 * Math.PI / 2, Math.PI / 2, true); 
        context.stroke(); 
        
        context.beginPath();
        context.fillStyle='orangered';
        
        context.arc(this.x, this.y, 20, 0, 2 * Math.PI, true);
        context.fill();

        context.beginPath();
        context.moveTo(190, 420);
        context.lineTo(this.rubJoinX, this.rubJoinDownY);
        context.stroke();
    }
}

var ball = new Ball(160, 420)

var animate = function(){    
    drawBack()
    ball.drawBall()
    
    requestAnimationFrame(animate)
}
animate()

addEventListener("mousedown", function(event){
    var cnv = canvas.getBoundingClientRect()
    var x = event.clientX - cnv.left
    var y = event.clientY - cnv.top

    var dist = Math.sqrt(Math.pow(ball.x - x, 2) + Math.pow(ball.y - y, 2))

    if (dist <= 20){
        pressBall = true
    }
})

addEventListener("mouseup", function(event){
    if (pressBall === true){
        pressBall = false
        shot = true

        ball.tens = 160 - ball.x
        ball.addY = -(ball.y - 420) * 0.09
    }
})

addEventListener("mousemove", function(event){
    if (pressBall === true){
        var cnv = canvas.getBoundingClientRect()
        var x = event.clientX - cnv.left
        var y = event.clientY - cnv.top

        ball.x = x
        ball.y = y

        ball.rubJoinX = ball.x - 15
        ball.rubJoinUpY = ball.y - 10
        ball.rubJoinMidY = ball.y
        ball.rubJoinDownY = ball.y + 10
    }
})