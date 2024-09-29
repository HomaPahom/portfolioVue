<script setup>

import { defineEmits, ref, onMounted } from 'vue'

const canvas = ref(null)
const emit = defineEmits(['confettiVisible'])

onMounted(async () => {

    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    canvas.value.style.background = "";
    const ctx = canvas.value.getContext("2d");

    let balls = [];
    const nbrOfBalls = 200;//Change for more balls

    const Ball = function(x, y, dx, dy, radius, speed, gravity, spread, color, opacitySpeed = 0) {//Object describing a ball
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        
        this.radius = radius;
        this.gravity = gravity;
        this.spread = spread;
        this.currentSpeed = speed;
        this.color = color;
        this.opacity = 1;
        this.reachedTop = false

        this.draw = function(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            this.opacity -= opacitySpeed
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
        this.move = function(){
            this.x += this.spread * this.dx;

            if(this.dy >= this.gravity) {
                this.dy = this.gravity
            } else {
                this.dy += 0.1
            }

            this.y += this.dy
        }
    }

    for(let i = 0; i < nbrOfBalls; i++){//Initiate the ball array
        const xDir = Math.random()*2-1;
        let yDir = Math.random()*2-1;

        const speed = Math.random()*2+5
        const gravity = 10
        const spread = 5

        // Set initial upward velocity if ball is going upward
        yDir *= speed
        
        balls.push(new Ball(canvas.value.width / 2, canvas.value.height / 10, xDir, yDir, 3, speed, gravity, spread, getRandomColor(), 0.005));  
    }

    function wallHit(ball, canvasRef){
        if(ball.opacity <= 0) {
            return true
        }

        if(((ball.x+ball.radius)>=canvasRef.width || (ball.x-ball.radius)<=0) && (ball.y-ball.radius)<=0){	//If 
            return true
        }else	if((ball.x+ball.radius)>=canvasRef.width || (ball.x-ball.radius)<=0){
            return true
        }else if((ball.y-ball.radius)<=0 || (ball.y+ball.radius)>=canvasRef.height){
            return true
        }
        return false
    }

    
    function Render() {
        //ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.clearRect(0,0,canvas.value.width,canvas.value.height);
        //ctx.fillRect(0,0,canvas.width,canvas.height);
        
        const ballsOutOfBounds = []


        for(let i = 0; i<balls.length;i++){
            balls[i].draw();//draw new position
            if(wallHit(balls[i], canvas.value)) {
                ballsOutOfBounds.push(balls[i])
            }
            balls[i].move();//change position
        }
        
        if(ballsOutOfBounds.length !== balls.length) {
            window.requestAnimationFrame(Render);
        } else {
            // unmount itself when done
            emit('confettiVisible')
        }
    }

    Render()
    
    function resizeWindow(event){
        event.preventDefault()
        if(canvas?.value?.width && canvas?.value?.height) {
            canvas.value.width = window.innerWidth
            canvas.value.height = window.innerHeight
        }
    }

    window.addEventListener('resize', resizeWindow)


})





function getRandomColor(){//A function for generating a random color.
  let color = "";
  for(let i = 0; i<3; i++){
    color +=Math.floor(Math.random()*255);
    if(i!=2){
      color += ",";
    }
  }
  
  return color;
}


</script>

<template>
    <canvas class="confetti" ref="canvas"></canvas>
</template>

<style scoped lang="scss">
    .confetti {
        overflow: hidden;
        margin: 0;
        padding: 0;
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        width: 100%;
        height: 100%;
        z-index: 100000;
    }
</style>