let calendar;

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    // Little Jack 뮤지컬 스케줄 데이터
    const events = [
        // 6월 스케줄
        {
            title: '19:00 리틀잭',
            start: '2025-06-28',
            className: 'event-special',
            time: '19:00',
            detail: '첫공 무대인사',
            location: '뮤지컬 Little Jack'
        },

        // 7월 스케줄
        {
            title: '20:00 리틀잭',
            start: '2025-07-02',
            className: 'event-special',
            time: '20:00',
            detail: '커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-04',
            className: 'event-special',
            time: '20:00',
            detail: '커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-09',
            className: 'event-concert',
            time: '16:00',
            detail: '보이스카드 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-11',
            className: 'event-concert',
            time: '20:00',
            detail: '보이스카드 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-16',
            className: 'event-tv',
            time: '16:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-16',
            className: 'event-tv',
            time: '20:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '18:00 리틀잭',
            start: '2025-07-20',
            className: 'event-tv',
            time: '18:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-23',
            className: 'event-special',
            time: '16:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:00 리틀잭',
            start: '2025-07-26',
            className: 'event-special',
            time: '19:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        },

        // 8월 스케줄
        {
            title: '20:00 리틀잭',
            start: '2025-08-01',
            className: 'event-concert',
            time: '20:00',
            detail: '포스터 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '18:00 리틀잭',
            start: '2025-08-03',
            className: 'event-concert',
            time: '18:00',
            detail: '포스터 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-05',
            className: 'event-special',
            time: '20:00',
            detail: '싱어롱 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-08-09',
            className: 'event-special',
            time: '15:00',
            detail: '싱어롱 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-12',
            className: 'event-festival',
            time: '20:00',
            detail: '럭키드로우',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '14:00 리틀잭',
            start: '2025-08-15',
            className: 'event-festival',
            time: '14:00',
            detail: '럭키드로우',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:00 리틀잭',
            start: '2025-08-16',
            className: 'event-special',
            time: '19:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        }
    ];

    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: false,
        initialView: 'dayGridMonth',
        locale: 'ko',
        events: events,
        height: 'auto',
        dayMaxEvents: false,
        eventDisplay: 'block',

        dateClick: function (info) {
            const clickedDate = info.dateStr;
            const dayEvents = events.filter(event => event.start === clickedDate);

            if (dayEvents.length > 0) {
                showEventModal(clickedDate, dayEvents);
            }
        },

        eventClick: function (info) {
            const event = info.event;
            const eventData = events.find(e => e.title === event.title && e.start === event.startStr);
            showEventModal(event.startStr, [eventData]);
        },

        datesSet: function (info) {
            updateMonthTitle(info.start);
        }
    });

    calendar.render();

    // 네비게이션 버튼 이벤트
    document.getElementById('prevBtn').addEventListener('click', function () {
        calendar.prev();
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        calendar.next();
    });

    document.getElementById('todayBtn').addEventListener('click', function () {
        calendar.today();
    });
});

function updateMonthTitle(date) {
    const options = { year: 'numeric', month: 'long' };
    const title = date.toLocaleDateString('en-US', options);
    document.getElementById('monthTitle').textContent = title;
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
        listItem.innerHTML = `
            <div class="event-time">${event.time || ''} - 뮤지컬 리틀잭</div>
            <div class="event-name">${event.detail}</div>
        `;
        eventList.appendChild(listItem);
    });

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
}

function goBack() {
    if (history.length > 1) {
        history.back();
    } else {
        window.location.href = '/';
    }
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