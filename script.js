let calendar;

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    // 현재 날짜를 한국 시간으로 설정
    const now = new Date();
    // 현재 날짜로 초기화
    const initialDate = now;

    // Little Jack 뮤지컬 스케줄 데이터
    const events = [
        // 6월 스케줄
        {
            title: '19:00 리틀잭 첫공',
            start: '2025-06-28',
            className: 'event-time-19',  // 19시 공연 클래스
            time: '19:00',
            detail: '첫공 무대인사',
            location: '뮤지컬 Little Jack'
        },

        // 7월 스케줄
        {
            title: '20:00 리틀잭',
            start: '2025-07-02',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-04',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-09',
            className: 'event-time-16',  // 16시 공연 클래스
            time: '16:00',
            detail: '보이스카드 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-11',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '보이스카드 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-16',
            className: 'event-time-16',  // 16시 공연 클래스
            time: '16:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-07-16',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '18:00 리틀잭',
            start: '2025-07-20',
            className: 'event-time-18',  // 18시 공연 클래스
            time: '18:00',
            detail: '더블적립',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '16:00 리틀잭',
            start: '2025-07-23',
            className: 'event-time-16',  // 16시 공연 클래스
            time: '16:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:00 리틀잭',
            start: '2025-07-26',
            className: 'event-time-19',  // 19시 공연 클래스
            time: '19:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        },

        // 8월 스케줄
        {
            title: '20:00 리틀잭',
            start: '2025-08-01',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '포스터 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '18:00 리틀잭',
            start: '2025-08-03',
            className: 'event-time-18',  // 18시 공연 클래스
            time: '18:00',
            detail: '포스터 증정',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-05',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '싱어롱 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-08-09',
            className: 'event-time-15',  // 15시 공연 클래스
            time: '15:00',
            detail: '싱어롱 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-12',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '럭키드로우',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '14:00 리틀잭',
            start: '2025-08-15',
            className: 'event-time-14',  // 14시 공연 클래스
            time: '14:00',
            detail: '럭키드로우',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:00 리틀잭',
            start: '2025-08-16',
            className: 'event-time-19',  // 19시 공연 클래스
            time: '19:00',
            detail: '스페셜 커튼콜',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-20',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '스페셜 스탬프 위크',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '14:00 리틀잭',
            start: '2025-08-24',
            className: 'event-time-14',  // 14시 공연 클래스
            time: '14:00',
            detail: '스페셜 스탬프 위크',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-08-26',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '사인회',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-08-30',
            className: 'event-time-15',  // 15시 공연 클래스
            time: '15:00',
            detail: '',
            location: '뮤지컬 Little Jack'
        },

        // 9월 스케줄
        {
            title: '19:30 여단',
            start: '2025-09-02',
            className: 'event-time-19',  // 19:30 공연 클래스 (19시 클래스 사용)
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-09-03',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '스페셜 넘버 위크',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '19:30 여단',
            start: '2025-09-04',
            className: 'event-time-19',  // 19:30 공연 클래스 (19시 클래스 사용)
            time: '19:30',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '16:00 여단',
            start: '2025-09-06',
            className: 'event-time-16',  // 16시 공연 클래스
            time: '16:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '20:00 여단',
            start: '2025-09-06',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '',
            location: '뮤지컬 여단'
        },
        {
            title: '18:00 리틀잭',
            start: '2025-09-07',
            className: 'event-time-18',  // 18시 공연 클래스
            time: '18:00',
            detail: '스페셜 넘버 위크',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-09-10',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-09-13',
            className: 'event-time-15',  // 15시 공연 클래스
            time: '15:00',
            detail: '굿바이 스페셜넘버 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-09-16',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '멤버십 데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '20:00 리틀잭',
            start: '2025-09-18',
            className: 'event-time-20',  // 20시 공연 클래스
            time: '20:00',
            detail: '커튼콜데이',
            location: '뮤지컬 Little Jack'
        },
        {
            title: '15:00 리틀잭',
            start: '2025-09-20',
            className: 'event-time-15',  // 15시 공연 클래스
            time: '15:00',
            detail: '마지막 공연 무대인사',
            location: '뮤지컬 Little Jack'
        },

        // 10월 스케줄 - 박세미 생일
        {
            title: '🎂 박세미 생일',
            start: '2025-10-08',
            className: 'event-birthday',  // 생일 특별 클래스
            time: '',
            detail: '🎉 Happy Birthday 박세미! 🎉',
            location: '💖 Special Day 💖',
            type: 'birthday'
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
        eventContent: function(arg) {
            // 생일 이벤트인지 확인
            if (arg.event.extendedProps.type === 'birthday') {
                let eventEl = document.createElement('div');
                eventEl.style.background = 'linear-gradient(45deg, #ff6b9d, #ff8a80)';
                eventEl.style.padding = '4px 6px';
                eventEl.style.borderRadius = '8px';
                eventEl.style.color = 'white';
                eventEl.style.fontSize = '11px';
                eventEl.style.fontWeight = '600';
                eventEl.style.textAlign = 'center';
                eventEl.style.boxShadow = '0 2px 4px rgba(255, 107, 157, 0.4)';
                eventEl.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                eventEl.innerText = '🎂 세미 생일';
                
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
            }

            // 시간에 따른 색상 클래스 결정
            let colorClass = '';
            if (timeText === '14:00') colorClass = 'event-time-14';
            else if (timeText === '15:00') colorClass = 'event-time-15';
            else if (timeText === '16:00') colorClass = 'event-time-16';
            else if (timeText === '18:00') colorClass = 'event-time-18';
            else if (timeText === '19:00' || timeText === '19:30') colorClass = 'event-time-19';
            else if (timeText === '20:00') colorClass = 'event-time-20';

            // HTML 요소 생성
            let eventEl = document.createElement('div');
            eventEl.classList.add(colorClass);
            eventEl.style.padding = '2px 4px';
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
                // 뮤지컬 이벤트인 경우
                const eventTime = e.time || '';
                let eventTitle = '';
                if (e.location === '뮤지컬 Little Jack') {
                    eventTitle = eventTime + ' 리틀잭';
                } else if (e.location === '뮤지컬 여단') {
                    eventTitle = eventTime + ' 여단';
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

    // 네비게이션 버튼 이벤트
    document.getElementById('prevBtn').addEventListener('click', function () {
        calendar.prev();
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        calendar.next();
    });

    document.getElementById('todayBtn').addEventListener('click', function () {
        // 실제 오늘 날짜로 이동
        calendar.gotoDate(new Date());
    });
});

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
            listItem.style.background = 'linear-gradient(45deg, #ff6b9d, #ff8a80)';
            listItem.style.borderRadius = '8px';
            listItem.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            listItem.style.color = 'white';
            listItem.innerHTML = `
                <div class="event-time" style="color: white; font-weight: 600;">🎂 박세미님의 생일 🎂</div>
                <div class="event-name" style="color: white;">${event.detail}</div>
            `;
        } else {
            // 뮤지컬 제목 결정 (location 기반)
            let musicalTitle = '';
            if (event.location === '뮤지컬 Little Jack') {
                musicalTitle = '뮤지컬 리틀잭';
            } else if (event.location === '뮤지컬 여단') {
                musicalTitle = '뮤지컬 여단';
            }
            
            listItem.innerHTML = `
                <div class="event-time">${event.time || ''} - ${musicalTitle}</div>
                <div class="event-name">${event.detail}</div>
            `;
        }
        
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
