window.addEventListener('load', () => {
    const canvas = document.getElementById('interactiveCanvas');
    const ctx = canvas.getContext('2d');
    const points = [];
    let isDrawing = false;

    // Set canvas size to match the browser's width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function createRandomPoint() {
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        const speed = Math.random() * 10 + 1; // Random speed between 1 and 4 pixels per frame
        const opacity = 0; // 초기 불투명도를 0으로 설정
        const delay = Math.random() * 2000 + 1000; // 1~2초의 랜덤 딜레이

        const point = {
            x: centerX,
            y: centerY,
            angle: angle,
            speed: speed,
            opacity: opacity
        };

        // 지정된 시간 후 불투명도를 1로 변경
        setTimeout(() => {
            point.opacity = 1;
        }, delay);

        return point;
    }

    function updatePoints() {
        points.forEach(point => {
            point.x += Math.cos(point.angle) * point.speed;
            point.y += Math.sin(point.angle) * point.speed;
        });
    }

    function drawPoints() {
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${point.opacity})`; // 점의 불투명도를 설정
            ctx.fill();
        });
    }

    function addNewPoint() {
        points.push(createRandomPoint());
        if (points.length > 1000) { // 점의 수가 너무 많아지지 않도록 제한
            points.shift(); // 가장 오래된 점을 제거
        }
    }

    function animate() {
        if (!isDrawing) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        updatePoints();
        drawPoints();
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    window.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    setInterval(addNewPoint, 20); // 0.1초마다 새로운 점을 추가

    animate();
});
