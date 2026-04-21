let calendar;

// ===== 다크모드 기능 =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 페이지 로드 전 테마 적용 (깜빡임 방지)
initTheme();

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const initialDate = new Date();

    // Little Jack 뮤지컬 스케줄 데이터
    const events = [
        // 6월 스케줄
        {
            title: '19:00 리틀잭 첫공',
            start: '2025-06-28',
            time: '19:00',
            detail: '첫공 무대인사',
            location: '뮤지컬 Little Jack'
        },

        // 7월 스케줄
        {
            title: '20:00 리틀잭',
            start: '2025-07-02',
            time: '20:00',
            detail: '커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-04',
            time: '20:00',
            detail: '커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-09',
            time: '16:00',
            detail: '보이스카드 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-11',
            time: '20:00',
            detail: '보이스카드 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-16',
            time: '16:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-16',
            time: '20:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '18:00 리틀잭',
            start: '2025-07-20',
            time: '18:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-23',
            time: '16:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:00 리틀잭',
            start: '2025-07-26',
            time: '19:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        },

        // 8월 스케줄
        {
            title: '20:00 리틀잭',
            start: '2025-08-01',
            time: '20:00',
            detail: '포스터 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '18:00 리틀잭',
            start: '2025-08-03',
            time: '18:00',
            detail: '포스터 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-05',
            time: '20:00',
            detail: '싱어롱 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-08-09',
            time: '15:00',
            detail: '싱어롱 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-12',
            time: '20:00',
            detail: '럭키드로우',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '14:00 리틀잭',
            start: '2025-08-15',
            time: '14:00',
            detail: '럭키드로우',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:00 리틀잭',
            start: '2025-08-16',
            time: '19:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-20',
            time: '20:00',
            detail: '스페셜 스탬프 위크',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '14:00 리틀잭',
            start: '2025-08-24',
            time: '14:00',
            detail: '스페셜 스탬프 위크',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-26',
            time: '20:00',
            detail: '사인회',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-08-30',
            time: '15:00',
            detail: '',
            location: '뮤지컬 Little Jack'
        },

        // 9월 스케줄
        {
            title: '19:30 여단',
            start: '2025-09-02',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-09-03',
            time: '20:00',
            detail: '스페셜 넘버 위크',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:30 여단',
            start: '2025-09-04',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:00 여단',
            start: '2025-09-06',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-09-06',
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '18:00 리틀잭',
            start: '2025-09-07',
            time: '18:00',
            detail: '스페셜 넘버 위크',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:30 여단',
            start: '2025-09-09',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-09-10',
            time: '20:00',
            detail: '',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:30 여단',
            start: '2025-09-11',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-09-12',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-09-13',
            time: '15:00',
            detail: '굿바이 스페셜넘버 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 여단',
            start: '2025-09-14',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-09-14',
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-09-16',
            time: '20:00',
            detail: '멤버십 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:30 여단',
            start: '2025-09-17',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-09-18',
            time: '20:00',
            detail: '커튼콜데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:30 여단',
            start: '2025-09-19',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-09-20',
            time: '15:00',
            detail: '마지막 공연 무대인사',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 여단',
            start: '2025-09-21',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-09-21',
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-09-25',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-09-26',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-09-27',
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:00 여단',
            start: '2025-09-28',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },

        // 10월 스케줄
        {
            title: '19:30 여단',
            start: '2025-09-30',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-10-02',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:00 여단',
            start: '2025-10-04',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-10-05',
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        // 박세미 생일
        {
            title: '🎂 박세미 생일',
            start: '2025-10-08',
            time: '',
            detail: '🎉 Happy Birthday 박세미! 🎉',
            location: '💖 Special Day 💖',
            type: 'birthday'
        },
        {
            title: '19:30 여단',
            start: '2025-10-09',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-10-10',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:00 여단',
            start: '2025-10-12',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-10-12',
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-10-14',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-10-15',
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:00 여단',
            start: '2025-10-18',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:00 여단',
            start: '2025-10-19',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-10-21',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-10-23',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-10-25',
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:30 여단',
            start: '2025-10-29',
            time: '16:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 여단',
            start: '2025-10-30',
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },

        // 11월 스케줄
        {
            title: '16:00 여단',
            start: '2025-11-01',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:00 여단',
            start: '2025-11-02',
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '19:30 비망록',
            start: '2025-11-04',
            time: '19:30',
            detail: '',
            location: '비망록'
        },

        // 12월 스케줄
        {
            title: '19:30 춤추는 갈매기',
            start: '2025-12-05',
            time: '19:30',
            detail: '',
            location: '연극 춤추는 갈매기'
        },
        {
            title: '20:00 판',
            start: '2025-12-24',
            time: '20:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '14:00 판',
            start: '2025-12-25',
            time: '14:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '18:00 판',
            start: '2025-12-25',
            time: '18:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '15:00 판',
            start: '2025-12-27',
            time: '15:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '19:00 판',
            start: '2025-12-27',
            time: '19:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2025-12-31',
            time: '20:00',
            detail: '',
            location: '뮤지컬 판'
        },

        // 1월 스케줄 (판)
        {
            title: '14:00 판',
            start: '2026-01-01',
            time: '14:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '18:00 판',
            start: '2026-01-01',
            time: '18:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '14:00 판',
            start: '2026-01-04',
            time: '14:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '18:00 판',
            start: '2026-01-04',
            time: '18:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-01-07',
            time: '20:00',
            detail: '두 배 적립+신년 달력 증정',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-01-08',
            time: '20:00',
            detail: '두 배 적립+신년 달력 증정',
            location: '뮤지컬 판'
        },
        {
            title: '15:00 판',
            start: '2026-01-10',
            time: '15:00',
            detail: '두 배 적립+신년 달력 증정',
            location: '뮤지컬 판'
        },
        {
            title: '19:00 판',
            start: '2026-01-10',
            time: '19:00',
            detail: '두 배 적립+신년 달력 증정',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-01-14',
            time: '20:00',
            detail: '특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-01-15',
            time: '20:00',
            detail: '특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '15:00 판',
            start: '2026-01-17',
            time: '15:00',
            detail: '특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '19:00 판',
            start: '2026-01-17',
            time: '19:00',
            detail: '특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-01-20',
            time: '20:00',
            detail: '싱어롱 특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-01-23',
            time: '20:00',
            detail: '싱어롱 특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '15:00 판',
            start: '2026-01-24',
            time: '15:00',
            detail: '싱어롱 특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '19:00 판',
            start: '2026-01-24',
            time: '19:00',
            detail: '싱어롱 특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '14:00 판',
            start: '2026-01-25',
            time: '14:00',
            detail: '싱어롱 특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '18:00 판',
            start: '2026-01-25',
            time: '18:00',
            detail: '싱어롱 특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '19:30 판',
            start: '2026-01-26',
            time: '19:30',
            detail: '뮤지컬 <판> 콘서트 | 새해 大 잔치',
            location: '뮤지컬 판'
        },
        // 박세미 데뷔 15주년
        {
            title: '🎉 데뷔 15주년',
            start: '2026-01-27',
            time: '',
            detail: '🎊 데뷔 15주년 축하합니다! 🎊',
            location: '💖 Special Day 💖',
            type: 'anniversary'
        },
        {
            title: '20:00 판',
            start: '2026-01-27',
            time: '20:00',
            detail: '스찍사 카드 증정',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-01-28',
            time: '20:00',
            detail: '스찍사 카드 증정',
            location: '뮤지컬 판'
        },
        {
            title: '15:00 판',
            start: '2026-01-31',
            time: '15:00',
            detail: '스찍사 카드 증정',
            location: '뮤지컬 판'
        },
        {
            title: '19:00 판',
            start: '2026-01-31',
            time: '19:00',
            detail: '스찍사 카드 증정',
            location: '뮤지컬 판'
        },

        // 2월 스케줄 (판)
        {
            title: '20:00 판',
            start: '2026-02-05',
            time: '20:00',
            detail: '이야기꾼 서명회',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-02-06',
            time: '20:00',
            detail: '행운 뽑기날',
            location: '뮤지컬 판'
        },
        {
            title: '14:00 판',
            start: '2026-02-08',
            time: '14:00',
            detail: '행운 뽑기날',
            location: '뮤지컬 판'
        },
        {
            title: '18:00 판',
            start: '2026-02-08',
            time: '18:00',
            detail: '행운 뽑기날',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-02-11',
            time: '20:00',
            detail: '특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-02-13',
            time: '20:00',
            detail: '특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '14:00 판',
            start: '2026-02-15',
            time: '14:00',
            detail: '특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '18:00 판',
            start: '2026-02-15',
            time: '18:00',
            detail: '특별 커튼콜 주간',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-02-19',
            time: '20:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-02-20',
            time: '20:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '14:00 판',
            start: '2026-02-22',
            time: '14:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '18:00 판',
            start: '2026-02-22',
            time: '18:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-02-25',
            time: '20:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '20:00 판',
            start: '2026-02-27',
            time: '20:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '15:00 판',
            start: '2026-02-28',
            time: '15:00',
            detail: '',
            location: '뮤지컬 판'
        },
        {
            title: '19:00 판',
            start: '2026-02-28',
            time: '19:00',
            detail: '막공',
            location: '뮤지컬 판'
        },

        // 3월 스케줄 (까라마조프의자매들)
        {
            title: '19:00 까라마조프의자매들',
            start: '2026-03-07',
            time: '19:00',
            detail: '2026 링크 더 스페이스 낭독 페스티벌',
            location: '연극 까라마조프의자매들'
        },
        {
            title: '18:00 까라마조프의자매들',
            start: '2026-03-08',
            time: '18:00',
            detail: '2026 링크 더 스페이스 낭독 페스티벌',
            location: '연극 까라마조프의자매들'
        },

        // 4월 스케줄 (정희)
        {
            title: '20:00 정희',
            start: '2026-04-01',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '15:00 정희',
            start: '2026-04-04',
            className: 'event-time-15',
            time: '15:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-04-08',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-04-10',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-04-16',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '15:00 정희',
            start: '2026-04-18',
            className: 'event-time-15',
            time: '15:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '19:00 정희',
            start: '2026-04-18',
            className: 'event-time-19',
            time: '19:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-04-22',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '14:00 정희',
            start: '2026-04-26',
            className: 'event-time-14',
            time: '14:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-04-29',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '15:00 정희',
            start: '2026-05-02',
            className: 'event-time-15',
            time: '15:00',
            detail: '',
            location: '연극 정희'
        },

        // 5월 스케줄 (나의 별)
        {
            title: '14:00 나의 별',
            start: '2026-05-03',
            className: 'event-time-14',
            time: '14:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '18:00 나의 별',
            start: '2026-05-03',
            className: 'event-time-18',
            time: '18:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '18:00 나의 별',
            start: '2026-05-10',
            className: 'event-time-18',
            time: '18:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '14:00 정희',
            start: '2026-05-10',
            className: 'event-time-14',
            time: '14:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-05-12',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-05-14',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '15:00 정희',
            start: '2026-05-16',
            className: 'event-time-15',
            time: '15:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '19:00 정희',
            start: '2026-05-16',
            className: 'event-time-19',
            time: '19:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-05-20',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '20:00 정희',
            start: '2026-05-22',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 정희'
        },
        {
            title: '15:00 정희',
            start: '2026-05-25',
            className: 'event-time-15',
            time: '15:00',
            detail: '',
            location: '연극 정희'
        },

        // 5월 스케줄 (나의 별 추가)
        {
            title: '20:00 나의 별',
            start: '2026-05-13',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '20:00 나의 별',
            start: '2026-05-15',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '14:00 나의 별',
            start: '2026-05-17',
            className: 'event-time-14',
            time: '14:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '18:00 나의 별',
            start: '2026-05-17',
            className: 'event-time-18',
            time: '18:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '20:00 나의 별',
            start: '2026-05-21',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '19:00 나의 별',
            start: '2026-05-23',
            className: 'event-time-19',
            time: '19:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '14:00 나의 별',
            start: '2026-05-24',
            className: 'event-time-14',
            time: '14:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '18:00 나의 별',
            start: '2026-05-25',
            className: 'event-time-18',
            time: '18:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '20:00 나의 별',
            start: '2026-05-26',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '20:00 나의 별',
            start: '2026-05-28',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '20:00 나의 별',
            start: '2026-05-29',
            className: 'event-time-20',
            time: '20:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '19:00 나의 별',
            start: '2026-05-30',
            className: 'event-time-19',
            time: '19:00',
            detail: '',
            location: '연극 나의 별'
        },
        {
            title: '18:00 나의 별',
            start: '2026-05-31',
            className: 'event-time-18',
            time: '18:00',
            detail: '',
            location: '연극 나의 별'
        }
    ];

    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: false,
        initialView: 'dayGridMonth',
        initialDate: initialDate,
        locale: 'ko',
        events: events,
        height: 'auto',
        dayMaxEvents: false,
        eventDisplay: 'block',
        fixedWeekCount: false, // 달력의 주 수를 해당 월에 맞게 자동으로 조정
        showNonCurrentDates: false, // 현재 월에 속하지 않는 날짜 숨기기
        validRange: {
            start: '2024-12-01',
            end: '2026-12-31'
        }, // 유효한 날짜 범위 확장
        eventContent: function(arg) {
            // 생일 이벤트인지 확인
            if (arg.event.extendedProps.type === 'birthday') {
                let eventEl = document.createElement('div');
                eventEl.style.background = '#999999';
                eventEl.style.padding = '3px 6px';
                eventEl.style.borderRadius = '4px';
                eventEl.style.color = 'white';
                eventEl.style.fontSize = '11px';
                eventEl.style.fontWeight = '500';
                eventEl.style.textAlign = 'center';
                eventEl.innerText = 'Birthday';

                return { domNodes: [eventEl] };
            }

            // 데뷔 기념일 이벤트인지 확인
            if (arg.event.extendedProps.type === 'anniversary') {
                let eventEl = document.createElement('div');
                eventEl.style.background = '#999999';
                eventEl.style.padding = '3px 6px';
                eventEl.style.borderRadius = '4px';
                eventEl.style.color = 'white';
                eventEl.style.fontSize = '11px';
                eventEl.style.fontWeight = '500';
                eventEl.style.textAlign = 'center';
                eventEl.innerText = '데뷔 15주년';

                return { domNodes: [eventEl] };
            }

            // 시간 정보 추출 (기존 뮤지컬 일정)
            let timeText = arg.event.extendedProps.time || '';
            
            // 뮤지컬 제목 결정 (location 기반)
            let musicalTitle = '';
            if (arg.event.extendedProps.location === '뮤지컬 Little Jack') {
                musicalTitle = '리틀잭';
            } else if (arg.event.extendedProps.location === '뮤지컬 여단') {
                musicalTitle = '여단';
            } else if (arg.event.extendedProps.location === '뮤지컬 판') {
                musicalTitle = '판';
            } else if (arg.event.extendedProps.location === '비망록') {
                musicalTitle = '비망록';
            } else if (arg.event.extendedProps.location === '연극 춤추는 갈매기') {
                musicalTitle = '춤추는 갈매기';
            } else if (arg.event.extendedProps.location === '연극 정희') {
                musicalTitle = '정희';
            } else if (arg.event.extendedProps.location === '연극 까라마조프의자매들') {
                musicalTitle = '까라마조프의자매들';
            } else if (arg.event.extendedProps.location === '연극 나의 별') {
                musicalTitle = '나의 별';
            }

            // 공연별 색상
            const showColors = {
                '뮤지컬 Little Jack':     '#6B8CAE',
                '뮤지컬 여단':            '#7A9E7E',
                '뮤지컬 판':              '#8B7BAB',
                '비망록':                 '#A8896A',
                '연극 춤추는 갈매기':     '#5E9EA0',
                '연극 정희':              '#B57A8A',
                '연극 까라마조프의자매들':'#9E6B6B',
                '연극 나의 별':           '#A89A5E',
            };
            const bgColor = showColors[arg.event.extendedProps.location] || '#2d2d2d';

            // HTML 요소 생성
            let eventEl = document.createElement('div');
            eventEl.style.background = bgColor;
            eventEl.style.padding = '3px 6px';
            eventEl.style.borderRadius = '4px';
            eventEl.style.color = 'white';
            eventEl.style.fontSize = '11px';
            eventEl.style.fontWeight = '500';
            eventEl.innerText = timeText + ' ' + musicalTitle;

            return { domNodes: [eventEl] };
        },

        dateClick: function (info) {
            const clickedDate = info.dateStr;
            const dayEvents = events.filter(event => event.start === clickedDate);

            if (dayEvents.length > 0) {
                showEventModal(clickedDate, dayEvents);
            }
        },

        eventClick: function (info) {
            const event = info.event;
            const eventData = events.find(e => {
                // 생일 이벤트인 경우
                if (e.type === 'birthday') {
                    return e.title === event.title && e.start === event.startStr;
                }
                // 데뷔 기념일 이벤트인 경우
                if (e.type === 'anniversary') {
                    return e.title === event.title && e.start === event.startStr;
                }
                // 뮤지컬 이벤트인 경우
                const eventTime = e.time || '';
                let eventTitle = '';
                if (e.location === '뮤지컬 Little Jack') {
                    eventTitle = eventTime + ' 리틀잭';
                } else if (e.location === '뮤지컬 여단') {
                    eventTitle = eventTime + ' 여단';
                } else if (e.location === '뮤지컬 판') {
                    eventTitle = eventTime + ' 판';
                } else if (e.location === '비망록') {
                    eventTitle = eventTime + ' 비망록';
                } else if (e.location === '연극 춤추는 갈매기') {
                    eventTitle = eventTime + ' 춤추는 갈매기';
                } else if (e.location === '연극 정희') {
                    eventTitle = eventTime + ' 정희';
                } else if (e.location === '연극 까라마조프의자매들') {
                    eventTitle = eventTime + ' 까라마조프의자매들';
                } else if (e.location === '연극 나의 별') {
                    eventTitle = eventTime + ' 나의 별';
                }
                return eventTitle === event.title && e.start === event.startStr;
            });

            if (eventData) {
                showEventModal(event.startStr, [eventData]);
            }
        },

        datesSet: function (info) {
            updateMonthTitle(info.view.currentStart);
        }
    });

    calendar.render();

    // 초기 월 제목 설정
    updateMonthTitle(calendar.view.currentStart);

    // 네비게이션 버튼 이벤트 (애니메이션 포함)
    document.getElementById('prevBtn').addEventListener('click', function () {
        animateCalendarTransition(() => calendar.prev());
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        animateCalendarTransition(() => calendar.next());
    });

    document.getElementById('todayBtn').addEventListener('click', function () {
        animateCalendarTransition(() => calendar.gotoDate(new Date()));
    });
});

// 캘린더 월 전환 애니메이션
function animateCalendarTransition(callback) {
    const container = document.querySelector('.calendar-container');
    container.classList.add('calendar-transitioning');

    setTimeout(() => {
        callback();
        container.classList.remove('calendar-transitioning');
    }, 150);
}

function updateMonthTitle(date) {
    // 년도와 월을 한국어 형식으로 표시
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1

    // 년도와 월을 한국어 형식으로 조합
    document.getElementById('monthTitle').textContent = year + '년 ' + month + '월';
}

function showEventModal(date, dayEvents) {
    const modal = document.getElementById('eventModal');
    const modalDate = document.getElementById('modalDate');
    const eventList = document.getElementById('eventList');

    // 날짜 포맷팅
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[dateObj.getDay()];

    modalDate.textContent = `${year}.${month}.${day}(${dayName})`;

    // 이벤트 리스트 생성
    eventList.innerHTML = '';
    dayEvents.forEach(event => {
        const listItem = document.createElement('li');
        listItem.className = 'event-item';
        
        // 생일 이벤트인지 확인
        if (event.type === 'birthday') {
            listItem.style.background = '#f5f5f5';
            listItem.style.borderRadius = '6px';
            listItem.style.padding = '12px';
            listItem.innerHTML = `
                <div class="event-time" style="font-weight: 500;">박세미 생일</div>
                <div class="event-name">${event.detail}</div>
            `;
        } else if (event.type === 'anniversary') {
            listItem.style.background = '#f5f5f5';
            listItem.style.borderRadius = '6px';
            listItem.style.padding = '12px';
            listItem.innerHTML = `
                <div class="event-time" style="font-weight: 500;">데뷔 15주년</div>
                <div class="event-name">${event.detail}</div>
            `;
        } else {
            // 뮤지컬 제목 결정 (location 기반)
            let musicalTitle = '';
            if (event.location === '뮤지컬 Little Jack') {
                musicalTitle = '뮤지컬 리틀잭';
            } else if (event.location === '뮤지컬 여단') {
                musicalTitle = '뮤지컬 여단';
            } else if (event.location === '뮤지컬 판') {
                musicalTitle = '뮤지컬 판';
            } else if (event.location === '비망록') {
                musicalTitle = '비망록';
            } else if (event.location === '연극 춤추는 갈매기') {
                musicalTitle = '연극 춤추는 갈매기';
            } else if (event.location === '연극 정희') {
                musicalTitle = '연극 정희';
            } else if (event.location === '연극 까라마조프의자매들') {
                musicalTitle = '연극 까라마조프의자매들';
            } else if (event.location === '연극 나의 별') {
                musicalTitle = '연극 나의 별';
            }

            listItem.innerHTML = `
                <div class="event-time">${event.time || ''} - ${musicalTitle}</div>
                <div class="event-name">${event.detail}</div>
            `;
        }
        
        eventList.appendChild(listItem);
    });

    modal.style.display = 'block';
    // 애니메이션을 위해 약간의 딜레이 후 show 클래스 추가
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('show');
    // 애니메이션 완료 후 display none
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 모달 외부 클릭시 닫기
window.onclick = function (event) {
    const modal = document.getElementById('eventModal');
    if (event.target === modal) {
        closeModal();
    }
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
