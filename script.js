window.addEventListener('DOMContentLoaded', () => {
  // ==================== 스크롤 및 기본 기능 ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const scrollIndicator = document.querySelector('.scroll-indicator');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollIndicator.style.width = scrolled + '%';
  });
  
  // ==================== 배경음악 기능 ====================
  const bgm = document.getElementById('bgm');
  const audioToggle = document.getElementById('audio-toggle');
  const audioIcon = audioToggle.querySelector('.audio-icon');
  
  // 기본 설정
  let audioEnabled = false;
  bgm.volume = 0; // 초기 문음으로 설정
  
  // 자동재생 시도 (무음으로)
  const attemptAutoplay = () => {
    bgm.play()
      .then(() => {
        console.log('무음 자동재생 성공');
        // 자동재생은 성공했지만 무음 상태임
        audioToggle.classList.add('autoplaying');
        audioEnabled = true;
      })
      .catch(error => {
        console.log('자동재생 실패, 사용자 인터랙션 필요:', error);
      });
  };
  
  // 페이지 로드 후 자동재생 시도
  setTimeout(attemptAutoplay, 1000);
  
  // 배경음악 토글 버튼 클릭 이벤트
  audioToggle.addEventListener('click', () => {
    if (audioEnabled) {
      // 이미 재생 중이거나 자동재생 상태
      if (bgm.paused) {
        // 재생 시작 & 볼륨 설정
        bgm.volume = 0.3;
        bgm.play();
        audioIcon.classList.add('audio-on');
      } else {
        // 일시정지
        bgm.pause();
        audioIcon.classList.remove('audio-on');
      }
    } else {
      // 처음 클릭시 설정
      bgm.volume = 0.3; // 볼륨 30%로 설정
      bgm.play()
        .then(() => {
          audioEnabled = true;
          audioIcon.classList.add('audio-on');
        })
        .catch(error => {
          console.error('오디오 재생 실패:', error);
        });
    }
  });
  
  // 페이지 이탁 시 오디오 일시정지
  document.addEventListener('visibilitychange', () => {
    if (audioEnabled && bgm && !bgm.paused) {
      if (document.hidden) {
        bgm.pause();
      } else {
        bgm.play().catch(() => {});
      }
    }
  });
  
  // 스크롤 이벤트나 클릭 이벤트에서 자동재생 상태에서 소리 활성화
  const enableSound = () => {
    if (audioEnabled && bgm.volume === 0 && !bgm.paused) {
      // 재생은 되고 있지만 무음인 상태에서 소리를 활성화
      bgm.volume = 0.3;
      audioIcon.classList.add('audio-on');
      audioToggle.classList.remove('autoplaying');
      // 한 번만 실행하고 이벤트 제거
      window.removeEventListener('click', enableSound);
      window.removeEventListener('scroll', enableSound);
      window.removeEventListener('touchstart', enableSound);
    }
  };
  
  // 사용자 인터랙션 이벤트 연결
  window.addEventListener('click', enableSound);
  window.addEventListener('scroll', enableSound);
  window.addEventListener('touchstart', enableSound);
  
  // ==================== 카운트다운 타이머 ====================
  function updateCountdown() {
    // 한국 시간 2025년 6월 28일 19:00 (오후 7시)
    const targetDate = new Date('2025-06-28T19:00:00+09:00');
    const now = new Date();
    
    // 남은 시간 계산 (밀리초 단위)
    const diff = targetDate.getTime() - now.getTime();
    
    // 이미 지났는지 확인
    if (diff <= 0) {
      $('#countdown-days').text('00');
      $('#countdown-hours').text('00');
      $('#countdown-minutes').text('00');
      $('#countdown-seconds').text('00');
      return;
    }
    
    // 일, 시간, 분, 초 계산
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // 화면에 표시
    $('#countdown-days').text(days.toString().padStart(2, '0'));
    $('#countdown-hours').text(hours.toString().padStart(2, '0'));
    $('#countdown-minutes').text(minutes.toString().padStart(2, '0'));
    $('#countdown-seconds').text(seconds.toString().padStart(2, '0'));
  }
  
  // 초기화 및 1초마다 업데이트
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const highScoreElement = document.getElementById('highScore');
  const gameStatusElement = document.getElementById('gameStatus');

  let gameRunning = false;
  let gameOver = false;
  let score = 0;
  let highScore = 0;
  let gameSpeed = 2;

  const groundHeight = 50;
  const player = {
    x: 100,
    y: 0,
    width: 60,
    height: 60,
    velY: 0,
    jumping: false,
    grounded: false
  };

  const playerImage = new Image();
  playerImage.src = 'img/sem.png';
  let imageLoaded = false;

  playerImage.onload = () => {
    imageLoaded = true;
    draw();
  };

  playerImage.onerror = () => {
    imageLoaded = false;
    console.warn('이미지를 불러오지 못했습니다.');
    draw();
  };

  // 🟣 음표 이미지
  const noteImage = new Image();
  noteImage.src = 'img/note.png';
  let noteImageLoaded = false;

  noteImage.onload = () => {
    noteImageLoaded = true;
  };

  noteImage.onerror = () => {
    noteImageLoaded = false;
    console.warn('note.png 이미지 불러오기 실패');
  };

  let obstacles = [];
  const obstacleWidth = 16;
  const obstacleHeight = 16;

  function init() {
    player.y = canvas.height - groundHeight - player.height;
    player.velY = 0;
    player.grounded = true;
    obstacles = [];
    score = 0;
    gameSpeed = 2;
    updateScore();
  }

  function updateScore() {
    scoreElement.textContent = score;
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

  function updatePlayer() {
    player.velY += 0.8;
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
      }
    }

    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
      if (Math.random() < 0.02) {
        obstacles.push({
          x: canvas.width,
          y: canvas.height - groundHeight - obstacleHeight,
          width: obstacleWidth,
          height: obstacleHeight
        });
      }
    }

    if (score >= 100) gameSpeed += 0.001;
    if (score >= 300) gameSpeed += 0.001;
    if (score >= 500) gameSpeed += 0.001;
  }

  function checkCollisions() {
    for (const obs of obstacles) {
      const px = player.x + 8;
      const py = player.y + 8;
      const pw = player.width - 16;
      const ph = player.height - 16;

      const ox = obs.x + 3;
      const oy = obs.y + 3;
      const ow = obs.width - 6;
      const oh = obs.height - 6;

      if (px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy) {
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

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 배경
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 땅
    ctx.fillStyle = '#333';
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    // 플레이어
    if (imageLoaded) {
      ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    } else {
      ctx.fillStyle = '#ff3366';
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    // 장애물 - 음표 그리기
    for (const obs of obstacles) {
    const x = obs.x;
    const y = obs.y;
    const w = obs.width;
    const h = obs.height;

    // 원형 (음표 머리)
    ctx.beginPath();
    ctx.fillStyle = '#ff6b6b';
    ctx.ellipse(x + w / 2, y + h - 8, w / 2, h / 3, -0.2, 0, Math.PI * 2); // 약간 기울인 타원
    ctx.fill();

    // 막대
    ctx.beginPath();
    ctx.moveTo(x + w - 4, y + h - 8);
    ctx.lineTo(x + w - 4, y - 12);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff6b6b';
    ctx.stroke();

    // 꼬리 (곡선)
    ctx.beginPath();
    ctx.moveTo(x + w - 4, y - 12);
    ctx.quadraticCurveTo(x + w + 4, y - 16, x + w - 4, y - 20);
    ctx.lineWidth = 2;
    ctx.stroke();
    }

    // UI
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Score: ${score}`, 20, 30);

    if (!gameRunning && !gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('터치하거나 스페이스바를 누르세요', canvas.width / 2, canvas.height / 2);
      ctx.textAlign = 'left';
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(`Game Over! 점수: ${score}`, canvas.width / 2, canvas.height / 2);
      ctx.textAlign = 'left';
    }
  }

  function gameLoop() {
    if (!gameRunning) return;
    updatePlayer();
    updateObstacles();
    checkCollisions();
    draw();
    if (gameRunning) requestAnimationFrame(gameLoop);
  }

  init();
  draw();
});
