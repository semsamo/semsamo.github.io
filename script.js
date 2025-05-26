window.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 SEMSAMO Company - 페이지 로드 완료');
  
  // ==================== 스크롤 및 기본 기능 ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 스크롤 인디케이터 애니메이션
  const scrollIndicator = document.querySelector('.scroll-indicator');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollIndicator.style.width = scrolled + '%';
    
    // 네비게이션 스크롤 효과
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // 인터섹션 옵저버로 애니메이션 트리거
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // 애니메이션 요소들 관찰
  document.querySelectorAll('.animate-in, .animate-left, .animate-right').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
  
  // ==================== 카운트다운 타이머 ====================
  function updateCountdown() {
    // 한국 시간 2025년 6월 28일 19:00 (오후 7시)
    const targetDate = new Date('2025-06-28T19:00:00+09:00');
    const now = new Date();
    
    // 남은 시간 계산 (밀리초 단위)
    const diff = targetDate.getTime() - now.getTime();
    
    // 이미 지났는지 확인
    if (diff <= 0) {
      document.getElementById('countdown-days').textContent = '00';
      document.getElementById('countdown-hours').textContent = '00';
      document.getElementById('countdown-minutes').textContent = '00';
      document.getElementById('countdown-seconds').textContent = '00';
      return;
    }
    
    // 일, 시간, 분, 초 계산
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // 숫자 앞에 0 추가하는 함수
    function padZero(num) {
      return num.toString().padStart(2, '0');
    }
    
    // 카운트다운 애니메이션
    const countdownElements = [
      { id: 'countdown-days', value: padZero(days) },
      { id: 'countdown-hours', value: padZero(hours) },
      { id: 'countdown-minutes', value: padZero(minutes) },
      { id: 'countdown-seconds', value: padZero(seconds) }
    ];

    countdownElements.forEach(({ id, value }) => {
      const element = document.getElementById(id);
      if (element && element.textContent !== value) {
        element.style.transform = 'scale(1.1)';
        element.textContent = value;
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 150);
      }
    });
  }
  
  // 초기화 및 1초마다 업데이트
  setTimeout(function() {
    updateCountdown(); // 즉시 실행
    setInterval(updateCountdown, 1000); // 1초마다 업데이트
  }, 500); // 0.5초 뒤에 시작

  // ==================== 게임 로직 ====================
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const highScoreElement = document.getElementById('highScore');
  const gameStatusElement = document.getElementById('gameStatus');

  let gameRunning = false;
  let gameOver = false;
  let score = 0;
  let highScore = parseInt(localStorage.getItem('semsoonRunnerHighScore') || '0');
  let gameSpeed = 2;
  let animationId;

  // 초기 최고점수 표시
  highScoreElement.textContent = highScore;

  const groundHeight = 50;
  const player = {
    x: 100,
    y: 0,
    width: 60,
    height: 60,
    velY: 0,
    jumping: false,
    grounded: false,
    color: '#ff3366'
  };

  // 플레이어 이미지 로딩
  const playerImage = new Image();
  playerImage.src = 'img/sem.png';
  let imageLoaded = false;

  playerImage.onload = () => {
    imageLoaded = true;
    draw();
  };

  playerImage.onerror = () => {
    imageLoaded = false;
    console.warn('셈순 이미지를 불러오지 못했습니다. 기본 모양으로 표시됩니다.');
    draw();
  };

  let obstacles = [];
  const obstacleWidth = 20;
  const obstacleHeight = 20;

  // 파티클 시스템
  let particles = [];

  function createParticle(x, y, color = '#ff3366') {
    return {
      x: x,
      y: y,
      velX: (Math.random() - 0.5) * 4,
      velY: (Math.random() - 0.5) * 4,
      life: 1,
      decay: 0.02,
      color: color,
      size: Math.random() * 3 + 1
    };
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.velX;
      p.y += p.velY;
      p.life -= p.decay;
      p.size *= 0.98;
      
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function drawParticles() {
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function init() {
    player.y = canvas.height - groundHeight - player.height;
    player.velY = 0;
    player.grounded = true;
    player.jumping = false;
    obstacles = [];
    particles = [];
    score = 0;
    gameSpeed = 2;
    updateScore();
  }

  function updateScore() {
    scoreElement.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore;
      localStorage.setItem('semsoonRunnerHighScore', highScore.toString());
    }
  }

  function handleGameAction() {
    if (!gameRunning && !gameOver) {
      startGame();
    } else if (gameOver) {
      resetGame();
    } else if (player.grounded) {
      jump();
    }
  }

  // 키보드 및 터치 이벤트
  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      handleGameAction();
    }
  });

  canvas.addEventListener('click', e => {
    e.preventDefault();
    handleGameAction();
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    handleGameAction();
  }, { passive: false });

  function startGame() {
    gameRunning = true;
    gameOver = false;
    init();
    gameStatusElement.textContent = '🎵 Running with Semsoon! 🎵';
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
      player.velY = -16;
      player.jumping = true;
      player.grounded = false;
      
      // 점프 파티클 효과
      for (let i = 0; i < 5; i++) {
        particles.push(createParticle(
          player.x + player.width/2, 
          player.y + player.height, 
          '#00ff88'
        ));
      }
    }
  }

  function updatePlayer() {
    player.velY += 0.8; // 중력
    player.y += player.velY;

    if (player.y >= canvas.height - groundHeight - player.height) {
      player.y = canvas.height - groundHeight - player.height;
      player.velY = 0;
      player.jumping = false;
      player.grounded = true;
    }
  }

  function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].x -= gameSpeed;
      
      if (obstacles[i].x + obstacleWidth < 0) {
        obstacles.splice(i, 1);
        score += 10;
        updateScore();
        
        // 점수 획득 파티클
        for (let j = 0; j < 3; j++) {
          particles.push(createParticle(
            canvas.width - 50, 
            30, 
            '#00ff88'
          ));
        }
      }
    }

    // 새 장애물 생성
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
      if (Math.random() < 0.02 + (score * 0.00001)) { // 점수가 높을수록 더 자주 생성
        obstacles.push({
          x: canvas.width,
          y: canvas.height - groundHeight - obstacleHeight,
          width: obstacleWidth,
          height: obstacleHeight,
          hue: Math.random() * 360
        });
      }
    }

    // 게임 속도 증가
    if (score >= 100) gameSpeed += 0.001;
    if (score >= 300) gameSpeed += 0.001;
    if (score >= 500) gameSpeed += 0.001;
  }

  function checkCollisions() {
    for (const obs of obstacles) {
      const px = player.x + 10;
      const py = player.y + 10;
      const pw = player.width - 20;
      const ph = player.height - 20;

      const ox = obs.x + 5;
      const oy = obs.y + 5;
      const ow = obs.width - 10;
      const oh = obs.height - 10;

      if (px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy) {
        gameOver = true;
        gameRunning = false;
        gameStatusElement.textContent = '💥 Game Over! Press SPACE to restart';
        
        // 충돌 파티클 효과
        for (let i = 0; i < 15; i++) {
          particles.push(createParticle(
            player.x + player.width/2, 
            player.y + player.height/2, 
            '#ff3366'
          ));
        }
        
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        return;
      }
    }
  }

  function draw() {
    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 별 배경
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 50; i++) {
      const x = (i * 123 + Date.now() * 0.001) % canvas.width;
      const y = (i * 456) % (canvas.height - groundHeight);
      ctx.fillRect(x, y, 1, 1);
    }

    // 땅
    const groundGradient = ctx.createLinearGradient(0, canvas.height - groundHeight, 0, canvas.height);
    groundGradient.addColorStop(0, '#ff3366');
    groundGradient.addColorStop(1, '#d63384');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    // 플레이어
    ctx.save();
    if (imageLoaded) {
      if (player.jumping) {
        ctx.translate(player.x + player.width/2, player.y + player.height/2);
        ctx.rotate(Math.sin(Date.now() * 0.01) * 0.1);
        ctx.translate(-player.width/2, -player.height/2);
        ctx.drawImage(playerImage, 0, 0, player.width, player.height);
      } else {
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
      }
    } else {
      // 기본 플레이어 모양 (더 멋있게)
      ctx.fillStyle = player.color;
      ctx.shadowColor = player.color;
      ctx.shadowBlur = 20;
      ctx.fillRect(player.x, player.y, player.width, player.height);
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 장애물 (음표 모양, 더 화려하게)
    obstacles.forEach(obs => {
      const x = obs.x;
      const y = obs.y;
      const w = obs.width;
      const h = obs.height;

      // 무지개 색상
      const hue = (obs.hue + Date.now() * 0.1) % 360;
      const color = `hsl(${hue}, 70%, 60%)`;
      
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      
      // 음표 머리 (글로우 효과)
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.ellipse(x + w/2, y + h - 8, w/2, h/3, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // 음표 막대
      ctx.beginPath();
      ctx.moveTo(x + w - 4, y + h - 8);
      ctx.lineTo(x + w - 4, y - 12);
      ctx.lineWidth = 4;
      ctx.stroke();

      // 음표 꼬리
      ctx.beginPath();
      ctx.moveTo(x + w - 4, y - 12);
      ctx.quadraticCurveTo(x + w + 6, y - 18, x + w - 4, y - 24);
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.shadowBlur = 0;
    });

    // 파티클 그리기
    drawParticles();

    // UI
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Inter';
    ctx.fillText(`Score: ${score}`, 20, 35);
    
    ctx.fillStyle = '#00ff88';
    ctx.fillText(`Best: ${highScore}`, 20, 60);

    // 게임 상태 오버레이
    if (!gameRunning && !gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Space Grotesk';
      ctx.textAlign = 'center';
      ctx.fillText('🎵 Semsoon Runner 🎵', canvas.width/2, canvas.height/2 - 20);
      
      ctx.font = '16px Inter';
      ctx.fillText('터치하거나 스페이스바를 누르세요', canvas.width/2, canvas.height/2 + 10);
      ctx.textAlign = 'left';
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ff3366';
      ctx.font = 'bold 28px Space Grotesk';
      ctx.textAlign = 'center';
      ctx.fillText('💥 Game Over! 💥', canvas.width/2, canvas.height/2 - 20);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px Inter';
      ctx.fillText(`최종 점수: ${score}`, canvas.width/2, canvas.height/2 + 10);
      
      if (score === highScore && score > 0) {
        ctx.fillStyle = '#00ff88';
        ctx.fillText('🎉 새로운 최고 기록! 🎉', canvas.width/2, canvas.height/2 + 35);
      }
      
      ctx.textAlign = 'left';
    }
  }

  function gameLoop() {
    if (!gameRunning) return;
    
    updatePlayer();
    updateObstacles();
    updateParticles();
    checkCollisions();
    draw();
    
    if (gameRunning) {
      animationId = requestAnimationFrame(gameLoop);
    }
  }

  // 초기화
  init();
  draw();
  
  // 캔버스 크기 조정
  function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.offsetWidth - 32; // padding 고려
    if (containerWidth < canvas.width) {
      const scale = containerWidth / canvas.width;
      canvas.style.width = containerWidth + 'px';
      canvas.style.height = (canvas.height * scale) + 'px';
    }
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  console.log('🎮 셈순 러너 게임이 준비되었습니다!');
});