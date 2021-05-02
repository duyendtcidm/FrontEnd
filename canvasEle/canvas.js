var canvas = document.querySelector('canvas');

canvas.width= window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255,35,255,0.2)';
// c.fillRect(150, 100, 100, 100);
// c.fillStyle = 'rgba(0,225,100,0.3)';
// c.fillRect(200, 300, 100, 100);
// c.fillStyle = 'rgba(0,5,200,0.2)';
// c.fillRect(350, 100, 100, 100);

// // draw line
// c.beginPath();
// c.moveTo(50, 200);
// c.lineTo(200, 200);
// c.lineTo(300, 100);
// c.strokeStyle = '#B40431';
// c.stroke();

//Draw Arc, Circle
// c.beginPath();
// c.arc(400, 300, 30, Math.PI * 2, false );
// c.strokeStyle = '#173B0B';
// c.stroke();

// for(var i = 0; i < 100; i ++) {//i : so luong hinh 
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, Math.PI * 2, false );
//     c.strokeStyle = '#173B0B';
//     c.stroke();
//}
var mouse = {
    x : undefined,
    y : undefined
}

var maxRadius = 40;
//var minRadius = 3;

var colorArray = [
    '#FEA443',
    '#705E78',
    '#A5AAA3',
    '#812F33',
    '#F3FEB0'
]


window.addEventListener('mousemove', function(event){
    //console.log('event');
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.width;
    canvas.height = window.height;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0,  Math.PI * 2, false );
        //c.strokeStyle = '#173B0B';
        //c.fill();// = 'rgba(255,35,255,0.2)';
        c.fillStyle = this.color;
        c.fill();
        //c.stroke();  
      }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        //x += dx;
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius +=1;
            }
        }else if (this.radius > this.minRadius) {
            this.radius -=1;
        }

        this.draw();

    }
}
    

var circleArray =[];

function init() {
    circleArray = [];
    for( var i = 0; i < 1000; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius*2) + radius;
        var y = Math.random() * (innerHeight - radius*2) +radius;
        var dx = (Math.random() - 0.5) ;
        var dy = (Math.random() - 0.5 ); 
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

//var circle = new Circle(200, 200, 4, 4, 30);


    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        //circle.update();
        for(var i = 0; i < circleArray.length; i++) {
            circleArray[i].update(); 
        }
     
    }
    init();
    animate();
   
    console.log(canvas); 

