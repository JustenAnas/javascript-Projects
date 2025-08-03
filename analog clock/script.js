let isAlarmMode = false;

// 🔁 DOM Ready

document.addEventListener('DOMContentLoaded', () => {
  const hourHand = document.getElementById('hour');
  const minuteHand = document.getElementById('minute');
  const secondHand = document.getElementById('second');
  const stopwatchDisplay = document.getElementById('stopwatchDisplay');

  const alarmSound = new Audio('funny-alarm-317531.mp3');
  alarmSound.loop = true;

  let alarmHourSet = null;
  let alarmMinuteSet = null;
  let alarmAmPm = null;
  let alarmActive = false;
  let alarmTriggered = false;
  let clockInterval = null;
  let stopwatchInterval = null;
  let stopwatchStartTime = null;

  // ⏰ Live Clock
  function updateClock() {
    if (isAlarmMode) return;

    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    const hourDeg = 30 * (h % 12) + m / 2;
    const minuteDeg = 6 * m;
    const secondDeg = 6 * s;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
  }

  clockInterval = setInterval(updateClock, 1000);
  updateClock();

  // 🔘 Open Alarm UI
  document.getElementById('alarm').addEventListener('click', () => {
    isAlarmMode = true;
    document.getElementById('alarmOverlay').style.display = 'flex';
  });

  // ✅ Set Alarm
  document.getElementById('setAlarmBtn').addEventListener('click', () => {
    const hour = parseInt(document.getElementById('alarmHour').value);
    const minute = parseInt(document.getElementById('alarmMinute').value);
    const amPm = document.getElementById('amPm').value;

    if (isNaN(hour) || isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) {
      alert('Please enter a valid alarm time.');
      return;
    }

    alarmHourSet = hour;
    alarmMinuteSet = minute;
    alarmAmPm = amPm;
    alarmActive = true;
    alarmTriggered = false;

    document.getElementById('alarmOverlay').style.display = 'none';
    stopwatchDisplay.textContent = `⏰ Alarm set for ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${amPm}`;

    showCancelButton();
  });

  // ⏲️ Check Alarm
  setInterval(() => {
    if (!alarmActive || alarmTriggered) return;

    const now = new Date();
    let currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentAmPm = currentHour >= 12 ? 'PM' : 'AM';
    currentHour = currentHour % 12 || 12;

    if (
      currentHour === alarmHourSet &&
      currentMinute === alarmMinuteSet &&
      currentAmPm === alarmAmPm
    ) {
      clearInterval(clockInterval); // freeze hands
      alarmSound.play().catch(() => alert("Allow autoplay or click anywhere to play sound"));
      alarmTriggered = true;
      stopwatchDisplay.textContent = '🚨 Alarm ringing!';
    }
  }, 1000);

  // 🛑 Cancel Alarm
  function showCancelButton() {
    if (document.getElementById('cancelAlarmBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'cancelAlarmBtn';
    btn.textContent = '🛑 Cancel Alarm';
   btn.style.marginTop = '12px';
    btn.style.padding = '6px 14px';
    btn.style.borderRadius = '14px';
    btn.style.background = '#ff4444';
    btn.style.color = '#fff';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1rem';
    btn.style.border = 'none';
    btn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    btn.style.zIndex = '9999';
    btn.style.transition = 'transform 0.2s ease-in-out';
    btn.style.maxWidth = '90vw';
    btn.style.whiteSpace = 'nowrap';
    btn.style.marginLeft = '142px';

    btn.addEventListener('click', () => {
      alarmSound.pause();
      alarmSound.currentTime = 0;
      alarmActive = false;
      alarmTriggered = false;
      stopwatchDisplay.textContent = '⏰ Alarm cancelled';
      document.getElementById('alarmOverlay').style.display = 'none';
      document.getElementById('cancelAlarmBtn')?.remove();

      hourHand.style.transform = `rotate(0deg)`;
      minuteHand.style.transform = `rotate(0deg)`;
      secondHand.style.transform = `rotate(0deg)`;

      setTimeout(() => {
        isAlarmMode = false;
        clockInterval = setInterval(updateClock, 1000);
        stopwatchDisplay.textContent = '';
      }, 500);
    });

    document.querySelector('.clock-controls').appendChild(btn);
  }

  // ⏱ Stopwatch Logic
  document.querySelector('#stopwatch').addEventListener('click', () => {
    isAlarmMode = true;

    hourHand.style.transform = `rotate(0deg)`;
    minuteHand.style.transform = `rotate(0deg)`;
    secondHand.style.transform = `rotate(0deg)`;

    if (!stopwatchStartTime) {
      const confirmStart = confirm("Start the stopwatch?");
      if (!confirmStart) return;

      stopwatchStartTime = Date.now();
      stopwatchDisplay.textContent = '⏱️ 00:00:00';
      document.querySelector('#stopwatch').textContent = '⏹ Stop Stopwatch';

      stopwatchInterval = setInterval(() => {
        const elapsed = Date.now() - stopwatchStartTime;
        const secs = Math.floor(elapsed / 1000) % 60;
        const mins = Math.floor(elapsed / 60000) % 60;
        const hrs = Math.floor(elapsed / 3600000);

        stopwatchDisplay.textContent = `⏱️ ${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        secondHand.style.transform = `rotate(${secs * 6}deg)`;
        minuteHand.style.transform = `rotate(${mins * 6 + secs / 10}deg)`;
        hourHand.style.transform = `rotate(${(hrs % 12) * 30 + mins / 2}deg)`;
      }, 1000);
    } else {
      clearInterval(stopwatchInterval);
      const elapsed = Date.now() - stopwatchStartTime;
      stopwatchStartTime = null;
      document.querySelector('#stopwatch').textContent = '⏱ Start Stopwatch';

      const secs = Math.floor(elapsed / 1000) % 60;
      const mins = Math.floor(elapsed / 60000) % 60;
      const hrs = Math.floor(elapsed / 3600000);

      stopwatchDisplay.textContent = `⏱️ Final Time: ${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  });

  // ⏮ Return to Clock
  document.querySelector('#clock').addEventListener('click', () => {
    isAlarmMode = false;
    stopwatchDisplay.textContent = '';
    clearInterval(stopwatchInterval);
    stopwatchStartTime = null;
    document.querySelector('#stopwatch').textContent = '⏱ Start Stopwatch';
    updateClock();
  });

  // 🔊 Unlock Audio (on user interaction)
  document.body.addEventListener('click', () => {
    alarmSound.play().then(() => alarmSound.pause()).catch(() => {});
  }, { once: true });
});
