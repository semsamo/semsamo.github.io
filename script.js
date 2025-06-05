// 커스텀 커서
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// 초기 커서 위치 설정
cursor.style.left = '0px';
cursor.style.top = '0px';

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    // transform 대신 left, top 사용하여 위치 설정
    cursor.style.left = cursorX - 10 + 'px'; // 커서 중앙 정렬을 위해 -10px
    cursor.style.top = cursorY - 10 + 'px';  // 커서 중앙 정렬을 위해 -10px
    
    requestAnimationFrame(animateCursor);
}

// 페이지 로드 후 커서 애니메이션 시작
document.addEventListener('DOMContentLoaded', () => {
    animateCursor();
});

// 마그네틱 효과
const magneticElements = document.querySelectorAll('.floating-element, .enter-btn');

magneticElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.background = 'rgba(255, 255, 255, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'rgba(255, 255, 255, 0.8)';
        element.style.transform = '';
    });
    
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        if (element.classList.contains('enter-btn')) {
            element.style.transform = `translateX(-50%) translate(${x * 0.3}px, ${y * 0.3}px)`;
        } else {
            element.style.transform += ` translate(${x * 0.2}px, ${y * 0.2}px)`;
        }
    });
});

// 클릭 이펙트 및 링크 기능
document.querySelectorAll('.floating-element').forEach(element => {
    element.addEventListener('click', function() {
        this.style.transform += ' scale(0.95)';
        setTimeout(() => {
            this.style.transform = this.style.transform.replace(' scale(0.95)', '');
        }, 150);

        // Schedule 링크 처리
        if (this.classList.contains('element1')) {
            setTimeout(() => {
                window.location.href = '/schedule/index.html';
            }, 200);
        }
        
        // Artist 링크 처리
        if (this.classList.contains('element2')) {
            setTimeout(() => {
                window.location.href = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjky&pkid=1&os=174396&qvt=0&query=%EB%B0%95%EC%84%B8%EB%AF%B8';
            }, 200);
        }

        // Instagram 링크 처리
        if (this.classList.contains('element3')) {
            setTimeout(() => {
                window.location.href = 'https://www.instagram.com/1_0_0_8_/';
            }, 200);
        }
    });
});

// 패럴랙스 효과 개선
let isParallaxActive = false;
document.addEventListener('mousemove', (e) => {
    if (isParallaxActive) return;
    
    isParallaxActive = true;
    requestAnimationFrame(() => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        document.querySelectorAll('.floating-element').forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = mouseX * speed * 10;
            const y = mouseY * speed * 10;
            
            // 기존 transform 값을 덮어쓰지 않고 추가
            const currentTransform = element.style.transform || '';
            const baseTransform = currentTransform.replace(/translate\([^)]*\)/g, '');
            element.style.transform = baseTransform + ` translate(${x}px, ${y}px)`;
        });
        
        isParallaxActive = false;
    });
});

// 키보드 인터랙션
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        console.log('키보드 인터랙션 활성화');
    }
});

// 모바일 터치 지원
if ('ontouchstart' in window) {
    document.body.style.cursor = 'auto';
    cursor.style.display = 'none';
    
    // 터치 이벤트 추가
    document.querySelectorAll('.floating-element').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform += ' scale(1.05)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = this.style.transform.replace(' scale(1.05)', '');
        });
    });
} else {
    // 데스크톱에서만 커스텀 커서 활성화
    animateCursor();
}