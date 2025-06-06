document.addEventListener("DOMContentLoaded", function () {
    // D-Day 계산 함수
    function updateDDay() {
        // 한국 시간 2025년 6월 28일 19:00 (오후 7시)
        const targetDate = new Date('2025-06-28T19:00:00+09:00');
        const now = new Date();
        
        // 시간 차이 계산 (밀리초)
        const diffTime = targetDate.getTime() - now.getTime();
        
        const ddayElement = document.getElementById('dday-number');
        
        if (diffTime > 0) {
            // 남은 시간 계산
            const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
            
            if (days > 0) {
                ddayElement.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                        <span style="font-size: 3rem; font-weight: 800; line-height: 1;">D-${days}</span>
                        <span style="font-size: 2.5rem; font-weight: 800; color: #ffffff; text-shadow: 0 3px 6px rgba(0,0,0,0.5); letter-spacing: 2px;">${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>
                    </div>
                `;
            } else {
                ddayElement.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                        <span style="font-size: 2.5rem; font-weight: 800; line-height: 1;">D-Day</span>
                        <span style="font-size: 3rem; font-weight: 800; color: #ffffff; text-shadow: 0 3px 6px rgba(0,0,0,0.5); letter-spacing: 2px;">${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>
                    </div>
                `;
            }
        } else {
            // 공연이 시작된 후
            const pastTime = Math.abs(diffTime);
            const days = Math.floor(pastTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((pastTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((pastTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((pastTime % (1000 * 60)) / 1000);
            
            if (days > 0) {
                ddayElement.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                        <span style="font-size: 3rem; font-weight: 800; line-height: 1;">D+${days}</span>
                        <span style="font-size: 2.5rem; font-weight: 800; color: #ffffff; text-shadow: 0 3px 6px rgba(0,0,0,0.5); letter-spacing: 2px;">${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>
                    </div>
                `;
            } else {
                ddayElement.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
                        <span style="font-size: 2.2rem; font-weight: 800; line-height: 1;">공연 진행중</span>
                        <span style="font-size: 3rem; font-weight: 800; color: #ffffff; text-shadow: 0 3px 6px rgba(0,0,0,0.5); letter-spacing: 2px;">${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>
                    </div>
                `;
            }
        }
    }

    // D-Day 초기화 및 업데이트
    updateDDay();
    // 매초마다 업데이트
    setInterval(updateDDay, 1000);

    // Little Jack 뮤지컬 스케줄 데이터 (실제 스케줄만 포함)
    const scheduleEvents = [
        // 6월 스케줄
        {
            title: '첫공 무대인사',
            start: '2025-06-28T19:00:00',
            end: '2025-06-28T21:30:00',
            allDay: false,
            className: 'special-event'
        },
        
        // 7월 스케줄
        {
            title: '커튼콜',
            start: '2025-07-02T20:00:00',
            end: '2025-07-02T22:30:00',
            allDay: false,
            className: 'special-event'
        },
        {
            title: '커튼콜',
            start: '2025-07-04T20:00:00',
            end: '2025-07-04T22:30:00',
            allDay: false,
            className: 'special-event'
        },
        {
            title: '보이스카드 증정',
            start: '2025-07-09T16:00:00',
            end: '2025-07-09T18:30:00',
            allDay: false
        },
        {
            title: '보이스카드 증정',
            start: '2025-07-11T20:00:00',
            end: '2025-07-11T22:30:00',
            allDay: false
        },
        {
            title: '더블적립',
            start: '2025-07-16T16:00:00',
            end: '2025-07-16T18:30:00',
            allDay: false
        },
        {
            title: '더블적립 ',
            start: '2025-07-16T20:00:00',
            end: '2025-07-16T22:30:00',
            allDay: false
        },
        {
            title: '더블적립',
            start: '2025-07-20T18:00:00',
            end: '2025-07-20T20:30:00',
            allDay: false
        },
        {
            title: '스페셜 커튼콜',
            start: '2025-07-23T16:00:00',
            end: '2025-07-23T18:30:00',
            allDay: false,
            className: 'special-event'
        },
        {
            title: '스페셜 커튼콜',
            start: '2025-07-26T19:00:00',
            end: '2025-07-26T21:30:00',
            allDay: false,
            className: 'special-event'
        }
    ];

    // FullCalendar 초기화
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko',
        headerToolbar: {
            left: "prevYear,prev,next,nextYear today",
            center: "title",
            right: "",
        },
        buttonText: {
            today: '오늘'
        },
        events: scheduleEvents,
        eventTimeFormat: {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
        },
        height: 'auto',
        aspectRatio: 1.5,

        // 날짜 클릭 이벤트
        dateClick: function(info) {
            var date = new Date(info.dateStr);
            var dateYear = date.getFullYear();
            var dateMonth = date.getMonth() + 1;
            var dateDate = date.getDate();
            var dateDay = getDayName(date.getDay());

            var dateFormat = `${dateYear}.${dateMonth.toString().padStart(2, '0')}.${dateDate.toString().padStart(2, '0')}(${dateDay})`;

            // 해당 날짜의 이벤트 찾기
            var dayEvents = calendar.getEvents().filter(function(event) {
                var eventDate = new Date(event.start);
                return eventDate.toDateString() === date.toDateString();
            });

            showModal(dateFormat, dayEvents);
        },

        // 이벤트 클릭
        eventClick: function(info) {
            var eventDate = new Date(info.event.start);
            var dateYear = eventDate.getFullYear();
            var dateMonth = eventDate.getMonth() + 1;
            var dateDate = eventDate.getDate();
            var dateDay = getDayName(eventDate.getDay());

            var dateFormat = `${dateYear}.${dateMonth.toString().padStart(2, '0')}.${dateDate.toString().padStart(2, '0')}(${dateDay})`;

            showModal(dateFormat, [info.event]);
        },

        // 이벤트 스타일 커스터마이징
        eventDidMount: function(info) {
            if (info.event.classNames.includes('special-event')) {
                info.el.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
                info.el.style.borderLeft = '4px solid #ff6b6b';
            }
        }
    });

    calendar.render();

    // 요일 이름 반환 함수
    function getDayName(dayIndex) {
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        return days[dayIndex];
    }

    // 모달 표시 함수
    function showModal(dateFormat, events) {
        $("#modal-date").html(`<strong class="s-title">${dateFormat}</strong>`);

        var listItems = [];
        if (events.length > 0) {
            events.forEach(function(event) {
                var timeDisplay = "";
                if (!event.allDay) {
                    var startTime = new Date(event.start);
                    var hours = startTime.getHours().toString().padStart(2, '0');
                    var minutes = startTime.getMinutes().toString().padStart(2, '0');
                    timeDisplay = `${hours}:${minutes}`;
                }

                var eventTitle = event.title;
                var isSpecial = event.classNames && event.classNames.includes('special-event');
                var specialMark = isSpecial ? ' ⭐' : '';

                if (timeDisplay) {
                    listItems.push(`<li><span>${timeDisplay}</span><div>${eventTitle}${specialMark}</div></li>`);
                } else {
                    listItems.push(`<li><div>${eventTitle}${specialMark}</div></li>`);
                }
            });
        } else {
            listItems.push(`<li><div>등록된 공연일정이 없습니다.</div></li>`);
        }

        $("#modal-list").html(`<ul class="s-list">${listItems.join("")}</ul>`);
        $("#fullCalModal").modal();
    }

    // 뒤로가기 버튼
    $("#back").click(function(e) {
        e.preventDefault();
        if (document.referrer && document.referrer.includes(window.location.host)) {
            history.back();
        } else {
            window.location.href = '../index.html';
        }
    });
});