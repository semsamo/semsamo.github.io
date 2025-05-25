// ==================== 기본 기능 ====================

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll progress indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollIndicator.style.width = scrolled + '%';
});

// ==================== 애니메이션 ====================

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations
document.querySelectorAll('.animate-in, .animate-left, .animate-right').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el.classList.contains('animate-left') ? 'translateX(-50px)' : 
                        el.classList.contains('animate-right') ? 'translateX(50px)' : 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});

// Navigation background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ==================== 배경 효과 ====================

// Floating elements
function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.width = Math.random() * 100 + 50 + 'px';
    element.style.height = element.style.width;
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.animationDelay = Math.random() * 6 + 's';
    document.body.appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 10000);
}

setInterval(createFloatingElement, 3000);

// ==================== 게임 시스템 ====================

// Game elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameStatusElement = document.getElementById('gameStatus');

// Game state
let gameRunning = false;
let gameOver = false;
let score = 0;
let highScore = 0;
let gameSpeed = 2;

// Player configuration - 크기 증가 (45 -> 60)
const player = {
    x: 100,
    y: 150,
    width: 60,  // 45에서 60으로 증가
    height: 60, // 45에서 60으로 증가
    velY: 0,
    jumping: false,
    grounded: false,
    color: '#ff3366'
};

// Player image
const playerImage = new Image();
playerImage.src = 'img/sem.png';
let imageLoaded = false;

playerImage.onload = function() {
    imageLoaded = true;
    draw();
};

playerImage.onerror = function() {
    imageLoaded = false;
    console.log('Player image failed to load, using fallback');
};

// Game objects
let obstacles = [];
const obstacleWidth = 20;
const obstacleHeight = 40;
const groundHeight = 50;

// ==================== 게임 로직 ====================

// Game initialization
function init() {
    player.y = canvas.height - groundHeight - player.height;
    player.grounded = true;
    obstacles = [];
    score = 0;
    gameSpeed = 2;
    updateScore();
}

// Input handling
function handleGameAction() {
    if (!gameRunning && !gameOver) {
        startGame();
    } else if (gameOver) {
        resetGame();
    } else if (player.grounded) {
        jump();
    }
}

// Event listeners
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        handleGameAction();
    }
});

canvas.addEventListener('click', function(e) {
    e.preventDefault();
    handleGameAction();
});

canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    handleGameAction();
});

// Game control functions
function startGame() {
    gameRunning = true;
    gameOver = false;
    init();
    gameStatusElement.textContent = 'Running...';
    gameLoop();
}

function resetGame() {
    gameRunning = false;
    gameOver = false;
    init();
    gameStatusElement.textContent = 'Press SPACE to start';
    draw();
}

function jump() {
    if (player.grounded) {
        player.velY = -15;
        player.jumping = true;
        player.grounded = false;
    }
}

// ==================== 게임 업데이트 ====================

// Player physics
function updatePlayer() {
    player.velY += 0.8; // gravity
    player.y += player.velY;

    // Ground collision
    if (player.y >= canvas.height - groundHeight - player.height) {
        player.y = canvas.height - groundHeight - player.height;
        player.velY = 0;
        player.jumping = false;
        player.grounded = true;
    }
}

// Obstacle management
function updateObstacles() {
    // Move obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= gameSpeed;
        
        // Remove off-screen obstacles and add score
        if (obstacles[i].x + obstacleWidth < 0) {
            obstacles.splice(i, 1);
            score += 10;
            updateScore();
        }
    }

    // Spawn new obstacles
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
        if (Math.random() < 0.015) {
            obstacles.push({
                x: canvas.width,
                y: canvas.height - groundHeight - obstacleHeight,
                width: obstacleWidth,
                height: obstacleHeight
            });
        }
    }

    // Increase game speed based on score
    if (score >= 500) {
        gameSpeed += 0.003;
    } else if (score >= 300) {
        gameSpeed += 0.002;
    } else if (score >= 100) {
        gameSpeed += 0.002;
    } else {
        gameSpeed += 0.001;
    }
}

// Collision detection
function checkCollisions() {
    for (let obstacle of obstacles) {
        // Smaller hitboxes for better gameplay
        const playerHitboxX = player.x + 8;        // 5에서 8로 조정 (크기 증가에 맞춤)
        const playerHitboxY = player.y + 8;        // 5에서 8로 조정
        const playerHitboxWidth = player.width - 16;  // 10에서 16으로 조정
        const playerHitboxHeight = player.height - 16; // 10에서 16으로 조정
        
        const obstacleHitboxX = obstacle.x + 3;
        const obstacleHitboxY = obstacle.y + 3;
        const obstacleHitboxWidth = obstacle.width - 6;
        const obstacleHitboxHeight = obstacle.height - 6;

        if (playerHitboxX < obstacleHitboxX + obstacleHitboxWidth &&
            playerHitboxX + playerHitboxWidth > obstacleHitboxX &&
            playerHitboxY < obstacleHitboxY + obstacleHitboxHeight &&
            playerHitboxY + playerHitboxHeight > obstacleHitboxY) {
            
            gameOver = true;
            gameRunning = false;
            gameStatusElement.textContent = 'Game Over! Press SPACE to restart';
            
            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = highScore;
            }
            return;
        }
    }
}

// Score update
function updateScore() {
    scoreElement.textContent = score;
}

// ==================== 렌더링 ====================

function draw() {
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#111111');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    const groundGradient = ctx.createLinearGradient(0, canvas.height - groundHeight, 0, canvas.height);
    groundGradient.addColorStop(0, '#333333');
    groundGradient.addColorStop(1, '#222222');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    // Ground pattern
    ctx.fillStyle = '#444444';
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, canvas.height - groundHeight, 2, groundHeight);
    }

    // Draw player
    if (imageLoaded) {
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
        
        // Jump shadow effect
        if (!player.grounded) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(player.x + 20, player.y + player.height + 5, 5, 0, Math.PI * 2); // 크기에 맞춰 조정
            ctx.fill();
            ctx.beginPath();
            ctx.arc(player.x + 40, player.y + player.height + 5, 5, 0, Math.PI * 2); // 크기에 맞춰 조정
            ctx.fill();
        }
    } else {
        // Fallback character (크기 증가에 맞춰 조정)
        drawFallbackCharacter();
    }

    // Draw obstacles (musical notes)
    drawObstacles();

    // Draw UI
    drawUI();
}

// Fallback character drawing (크기 증가 버전)
function drawFallbackCharacter() {
    ctx.save();
    
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;
    const scale = player.width / 45; // 원래 크기 45를 기준으로 스케일 계산
    
    // 몸통 (갈색/회색) - 크기 조정
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(centerX - 12 * scale, centerY - 4 * scale, 24 * scale, 18 * scale);
    ctx.beginPath();
    ctx.arc(centerX, centerY + 4 * scale, 12 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // 머리 (주황색) - 크기 조정
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 12 * scale, 15 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // 귀 (주황색, 큰 귀) - 크기 조정
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.ellipse(centerX - 12 * scale, centerY - 18 * scale, 7 * scale, 10 * scale, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 12 * scale, centerY - 18 * scale, 7 * scale, 10 * scale, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 귀 안쪽 (더 진한 주황색) - 크기 조정
    ctx.fillStyle = '#FF7F00';
    ctx.beginPath();
    ctx.ellipse(centerX - 12 * scale, centerY - 18 * scale, 4 * scale, 6 * scale, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 12 * scale, centerY - 18 * scale, 4 * scale, 6 * scale, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 얼굴 부분 (더 밝은 주황색) - 크기 조정
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 10 * scale, 10 * scale, 7 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 눈 (큰 검은 눈) - 크기 조정
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX - 5 * scale, centerY - 12 * scale, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 5 * scale, centerY - 12 * scale, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // 눈 하이라이트 (흰색) - 크기 조정
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX - 4 * scale, centerY - 13 * scale, 1 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 6 * scale, centerY - 13 * scale, 1 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // 코 (작은 분홍 삼각형) - 크기 조정
    ctx.fillStyle = '#FFB6C1';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 8 * scale);
    ctx.lineTo(centerX - 2 * scale, centerY - 6 * scale);
    ctx.lineTo(centerX + 2 * scale, centerY - 6 * scale);
    ctx.closePath();
    ctx.fill();
    
    // 입 (작은 곡선) - 크기 조정
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 5 * scale, 2.5 * scale, 0.2, Math.PI - 0.2);
    ctx.stroke();
    
    // 팔과 다리 - 크기 조정
    ctx.fillStyle = '#8B7355';
    // 왼쪽 팔
    ctx.beginPath();
    ctx.ellipse(centerX - 18 * scale, centerY - 2 * scale, 4 * scale, 7 * scale, -0.5, 0, Math.PI * 2);
    ctx.fill();
    // 오른쪽 팔
    ctx.beginPath();
    ctx.ellipse(centerX + 18 * scale, centerY - 2 * scale, 4 * scale, 7 * scale, 0.5, 0, Math.PI * 2);
    ctx.fill();
    // 왼쪽 다리
    ctx.beginPath();
    ctx.ellipse(centerX - 7 * scale, centerY + 12 * scale, 4 * scale, 5 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    // 오른쪽 다리
    ctx.beginPath();
    ctx.ellipse(centerX + 7 * scale, centerY + 12 * scale, 4 * scale, 5 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

// Draw obstacles (musical notes)
function drawObstacles() {
    const noteGradient = ctx.createLinearGradient(0, 0, 20, 40);
    noteGradient.addColorStop(0, '#ff3366');
    noteGradient.addColorStop(1, '#ff6b6b');
    
    for (let obstacle of obstacles) {
        ctx.fillStyle = noteGradient;
        ctx.beginPath();
        ctx.arc(obstacle.x + 10, obstacle.y + 30, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillRect(obstacle.x + 16, obstacle.y + 10, 3, 20);
        
        // Glow effect
        ctx.shadowColor = '#ff3366';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Draw UI elements
function drawUI() {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Space Grotesk';
    ctx.fillText(`Score: ${score}`, 20, 30);
    
    // Game start screen
    if (!gameRunning && !gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Space Grotesk';
        ctx.textAlign = 'center';
        ctx.fillText('Semsoon Runner', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '16px Inter';
        ctx.fillText('PC: SPACE 키 | 모바일: 화면 터치', canvas.width / 2, canvas.height / 2 - 5);
        ctx.fillText('게임을 시작하려면 터치하세요!', canvas.width / 2, canvas.height / 2 + 20);
        ctx.textAlign = 'left';
    }

    // Game over screen
    if (gameOver) {
        const gameOverGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gameOverGradient.addColorStop(0, 'rgba(255, 51, 102, 0.9)');
        gameOverGradient.addColorStop(1, 'rgba(255, 107, 107, 0.9)');
        ctx.fillStyle = gameOverGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Space Grotesk';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = '20px Inter';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText('PC: SPACE 키 | 모바일: 화면 터치', canvas.width / 2, canvas.height / 2 - 5);
        ctx.fillText('다시 시작하려면 터치하세요!', canvas.width / 2, canvas.height / 2 + 30);
        ctx.textAlign = 'left';
    }
}

// ==================== 게임 루프 ====================

function gameLoop() {
    if (!gameRunning) return;

    updatePlayer();
    updateObstacles();
    checkCollisions();
    draw();

    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

// ==================== 초기화 ====================

// Initialize game
init();
draw();