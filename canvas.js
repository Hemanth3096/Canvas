
    window.addEventListener("load", () =>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const resetButton = document.getElementById('resetButton');
    const status = document.getElementById('status');

    // ctx.beginPath();
    // ctx.moveTo(100,200);
    // ctx.lineTo(100,200);
    // ctx.lineTo(200,100);
    // ctx.stroke();

    let painting = false;
    let lastX = 0;
    let lastY = 0;
    let circles = [];


    function startposition(){
        painting = true;
        draw(e);
    }

    function fineshedposition(){
        painting = false;
        ctx.beginPath();
    }
    function draw(e)
    {
        if(! painting) return;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        const [x, y] = [e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top];
        const radius = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

        const randomColor = getRandomColor();
        ctx.fillStyle = randomColor;
        ctx.strokeStyle = randomColor;

        ctx.beginPath();
        ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        circles.push({ x: lastX, y: lastY, radius, color: randomColor });

        [lastX, lastY] = [x, y];

        // ctx.lineTo(e.clientX , e.clientY);
        ctx.stroke();
        ctx.beginPath();
        // ctx.moveTo(e.clientX,e.clientY);
    }
    canvas.addEventListener("mousedown", startposition);
    canvas.addEventListener("mouseup", fineshedposition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener('click', checkHit);

        canvas.addEventListener('dblclick', deleteCircle);

        resetButton.addEventListener('click', clearCanvas);


    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles = [];
        status.textContent = 'Status: ';
    }

    function checkHit(e) {
        const [x, y] = [e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top];

        let hit = false;
        circles.forEach((circle) => {
            const distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
            if (distance <= circle.radius) {
                hit = true;
                status.textContent = 'Status: Hit';
                return;
            }
        });

        if (!hit) {
            status.textContent = 'Status: Miss';
        }
    }

    function deleteCircle(e) {
        const [x, y] = [e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top];

        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            const distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
            if (distance <= circle.radius) {
                circles.splice(i, 1);
                clearCanvas();
                circles.forEach((circle) => {
                    ctx.fillStyle = circle.color;
                    ctx.strokeStyle = circle.color;
                    ctx.beginPath();
                    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                });
                status.textContent = 'Status: Circle Deleted';
                return;
            }
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
