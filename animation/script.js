const meteor = document.getElementById('meteor');
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

function createMeteor() {
    const meteorClone = meteor.cloneNode();
    document.body.appendChild(meteorClone);
    
    // Устанавливаем начальную позицию метеорита
    meteorClone.style.left = Math.random() * screenWidth + 'px';
    meteorClone.style.top = '-30px'; // Начальная позиция выше экрана

    const fallSpeed = Math.random() * 3 + 2; // Скорость падения
    const duration = (screenHeight / fallSpeed) * 1000; // Время падения

    meteorClone.style.transition = `top ${duration}ms linear`;
    
    // Запускаем анимацию падения
    requestAnimationFrame(() => {
        meteorClone.style.top = screenHeight + 'px'; // Падаем до низа экрана
    });

    // Удаляем метеорит после падения
    setTimeout(() => {
        meteorClone.remove();
    }, duration);

    // Создаём след из пламени
    createFireTrail(meteorClone);
}

function createFireTrail(meteorClone) {
    const trailCount = 10; // Количество частиц пламени
    for (let i = 0; i < trailCount; i++) {
        const fire = document.createElement('div');
        fire.className = 'fire-trail';
        document.body.appendChild(fire);
        
        // Устанавливаем начальную позицию пламени
        fire.style.left = parseFloat(meteorClone.style.left) + 'px';
        fire.style.top = parseFloat(meteorClone.style.top) + 'px';
        
        // Задаём задержку и направление пламени
        const delay = Math.random() * 200; // случайная задержка
        fire.style.transition = `top ${Math.random() * 500 + 500}ms linear, left ${Math.random() * 50 - 25}px linear`;
        
        setTimeout(() => {
            fire.style.top = parseFloat(fire.style.top) + 30 + 'px';
            fire.style.left = parseFloat(fire.style.left) + (Math.random() * 50 - 25) + 'px'; // Двигаемся вбок
        }, delay);

        // Удаляем след после анимации
        setTimeout(() => {
            fire.remove();
        }, delay + 700);
    }
}

// Запускаем анимацию каждые 500 мс
setInterval(createMeteor, 500);
