 let isAlarmMode = false;
let stopwatchInterval = null;
let stopwatchStartTime = null;

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
  let clockInterval = setInterval(updateClock, 1000);

  function updateClock() {
    if (isAlarmMode) return;
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    hourHand.style.transform = `rotate(${30 * (h % 12) + m / 2}deg)`;
    minuteHand.style.transform = `rotate(${6 * m}deg)`;
    secondHand.style.transform = `rotate(${6 * s}deg)`;
  }

  updateClock();

  document.getElementById('alarm').addEventListener('click', () => {
    isAlarmMode = true;
    document.getElementById('alarmOverlay').style.display = 'flex';
  });

  document.getElementById('setAlarmBtn').addEventListener('click', () => {
    const hour = parseInt(document.getElementById('alarmHour').value);
    const minute = parseInt(document.getElementById('alarmMinute').value);
    const amPm = document.getElementById('amPm').value;

    if (isNaN(hour) || isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) {
      alert('Enter a valid alarm time!');
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
      clearInterval(clockInterval);
      alarmSound.play().catch(() => console.warn("Audio playback failed"));
      alarmTriggered = true;
      stopwatchDisplay.textContent = '🚨 Alarm ringing!';
    }
  }, 1000);

  function showCancelButton() {
    let btn = document.getElementById('cancelAlarmBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'cancelAlarmBtn';
      btn.textContent = '🛑 Cancel Alarm';
      // btn.style.marginTop = '16px';
    btn.style.padding = '3px 18px';
    btn.style.borderRadius = '8px';
    btn.style.background = '#ff4444';
    btn.style.color = '#fff';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '13px';
    btn.style.border = 'none';
    btn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    btn.style.zIndex = '9999';  
    btn.style.transition = 'transform 0.2s ease-in-out';
    btn.style.maxWidth = '90vw';
    btn.style.whiteSpace = 'nowrap';

      btn.addEventListener('click', () => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmActive = false;
        alarmTriggered = false;
        stopwatchDisplay.textContent = '⏰ Alarm cancelled';
        document.getElementById('alarmOverlay').style.display = 'none';
        hourHand.style.transform = `rotate(0deg)`;
        minuteHand.style.transform = `rotate(0deg)`;
        secondHand.style.transform = `rotate(0deg)`;
        setTimeout(() => {
          isAlarmMode = false;
          clockInterval = setInterval(updateClock, 1000);
          stopwatchDisplay.textContent = '';
        }, 500);
        btn.remove();
      });

      document.querySelector('.clock-controls').appendChild(btn);
    }
  }

  // 🕒 Live clock button
  document.getElementById('clock').addEventListener('click', () => {
    isAlarmMode = false;
    clearInterval(stopwatchInterval);
    stopwatchStartTime = null;
    document.getElementById('stopwatch').textContent = '⏱ Start Stopwatch';
    stopwatchDisplay.textContent = '';
    updateClock();
  });

  // ⏱ Stopwatch button
  document.getElementById('stopwatch').addEventListener('click', () => {
    isAlarmMode = true;
    const hour = document.getElementById('hour');
    const minute = document.getElementById('minute');
    const second = document.getElementById('second');
    const display = document.getElementById('stopwatchDisplay');
    const button = document.getElementById('stopwatch');

    hour.style.transform = `rotate(0deg)`;
    minute.style.transform = `rotate(0deg)`;
    second.style.transform = `rotate(0deg)`;

    if (!stopwatchStartTime) {
      const ok = confirm('Start stopwatch?');
      if (!ok) return;
      stopwatchStartTime = Date.now();
      button.textContent = '⏹ Stop Stopwatch';
      display.textContent = `⏱️ 00:00:00`;

      stopwatchInterval = setInterval(() => {
        const elapsed = Date.now() - stopwatchStartTime;
        const secs = Math.floor(elapsed / 1000) % 60;
        const mins = Math.floor(elapsed / 60000) % 60;
        const hrs = Math.floor(elapsed / 3600000);
        display.textContent = `⏱️ ${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        second.style.transform = `rotate(${secs * 6}deg)`;
        minute.style.transform = `rotate(${mins * 6 + secs / 10}deg)`;
        hour.style.transform = `rotate(${(hrs % 12) * 30 + mins / 2}deg)`;
      }, 1000);

    } else {
      clearInterval(stopwatchInterval);
      const elapsed = Date.now() - stopwatchStartTime;
      stopwatchStartTime = null;
      button.textContent = '⏱ Start Stopwatch';

      const secs = Math.floor(elapsed / 1000) % 60;
      const mins = Math.floor(elapsed / 60000) % 60;
      const hrs = Math.floor(elapsed / 3600000);
      display.textContent = `⏱️ Final time: ${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  });

  // Unlock audio on first interaction
  document.body.addEventListener('click', () => {
    alarmSound.play().then(() => alarmSound.pause()).catch(() => {});
  }, { once: true });
});
