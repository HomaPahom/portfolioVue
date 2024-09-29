<script setup>
// Импорт необходимых функций из Vue
import { defineEmits, ref, onMounted } from 'vue'

// Реактивная переменная для хранения ссылки на canvas
const canvas = ref(null)
// Определение события для передачи в родительский компонент
const emit = defineEmits(['confettiVisible'])

// Хук жизненного цикла, вызываемый при монтировании компонента
onMounted(async () => {
    // Установка размеров canvas
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    canvas.value.style.background = "";
    const ctx = canvas.value.getContext("2d"); // Получение контекста для рисования

    let balls = []; // Массив для хранения шаров
    const nbrOfBalls = 200; // Количество шаров

    // Конструктор для создания объекта шара
    const Ball = function(x, y, dx, dy, radius, speed, gravity, spread, color, opacitySpeed = 0) {
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

        // Метод для рисования шара
        this.draw = function(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            this.opacity -= opacitySpeed
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Метод для перемещения шара
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

    // Инициализация массива шаров
    for(let i = 0; i < nbrOfBalls; i++){
        const xDir = Math.random()*2-1;
        let yDir = Math.random()*2-1;
        const speed = Math.random()*2+5
        const gravity = 10
        const spread = 5
        yDir *= speed
        balls.push(new Ball(canvas.value.width / 2, canvas.value.height / 10, xDir, yDir, 3, speed, gravity, spread, getRandomColor(), 0.005));
    }

    // Функция для проверки столкновения шара с границами canvas
    function wallHit(ball, canvasRef){
        if(ball.opacity <= 0) {
            return true
        }

        if(((ball.x+ball.radius)>=canvasRef.width || (ball.x-ball.radius)<=0) && (ball.y-ball.radius)<=0){
            return true
        } else if((ball.x+ball.radius)>=canvasRef.width || (ball.x-ball.radius)<=0){
            return true
        } else if((ball.y-ball.radius)<=0 || (ball.y+ball.radius)>=canvasRef.height){
            return true
        }
        return false
    }

    // Функция для рендеринга шаров
    function Render() {
        ctx.clearRect(0,0,canvas.value.width,canvas.value.height);

        const ballsOutOfBounds = []

        for(let i = 0; i<balls.length;i++){
            balls[i].draw(); // Рисование новой позиции шара
            if(wallHit(balls[i], canvas.value)) {
                ballsOutOfBounds.push(balls[i])
            }
            balls[i].move(); // Изменение позиции шара
        }

        if(ballsOutOfBounds.length !== balls.length) {
            window.requestAnimationFrame(Render);
        } else {
            // Отправка события в родительский компонент при завершении анимации
            emit('confettiVisible')
        }
    }

    Render()

    // Функция для изменения размера окна
    function resizeWindow(event){
        event.preventDefault()
        if(canvas?.value?.width && canvas?.value?.height) {
            canvas.value.width = window.innerWidth
            canvas.value.height = window.innerHeight
        }
    }

    // Добавление обработчика события изменения размера окна
    window.addEventListener('resize', resizeWindow)
})

// Функция для генерации случайного цвета
function getRandomColor(){
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
    <!-- Canvas для отображения конфетти -->
    <canvas class="confetti" ref="canvas"></canvas>
</template>

<style scoped lang="scss">
    .confetti {
        overflow: hidden; // Скрытие переполнения
        margin: 0; // Удаление отступов
        padding: 0; // Удаление внутренних отступов
        position: fixed; // Фиксированное положение
        top: 0; // Верхняя граница
        left: 0; // Левая граница
        pointer-events: none; // Отключение событий указателя
        width: 100%; // Ширина на весь экран
        height: 100%; // Высота на весь экран
        z-index: 100000; // Приоритетный слой
    }
</style>
