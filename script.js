/* =========================================================
   Exams Boost Morale — script.js
   ========================================================= */

// ── Motivational Quotes ──────────────────────────────────
const quotes = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Study while others are sleeping; work while others are loafing.", author: "William A. Ward" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
];

let currentQuoteIndex = Math.floor(Math.random() * quotes.length);

function displayQuote(index) {
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  quoteText.classList.add("fade");
  quoteAuthor.classList.add("fade");

  setTimeout(() => {
    quoteText.textContent = `"${quotes[index].text}"`;
    quoteAuthor.textContent = `— ${quotes[index].author}`;
    quoteText.classList.remove("fade");
    quoteAuthor.classList.remove("fade");
  }, 400);
}

document.getElementById("newQuoteBtn").addEventListener("click", () => {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  displayQuote(currentQuoteIndex);
});

document.getElementById("inspireBtn").addEventListener("click", () => {
  currentQuoteIndex = Math.floor(Math.random() * quotes.length);
  displayQuote(currentQuoteIndex);
  document.getElementById("quoteSection").scrollIntoView({ behavior: "smooth" });
});

// Initialise with a random quote
displayQuote(currentQuoteIndex);

// ── Study Focus Timer ────────────────────────────────────
let timerInterval = null;
let secondsLeft = 0;
let timerRunning = false;

const timerDisplay = document.getElementById("timerDisplay");
const timerMessage = document.getElementById("timerMessage");
const studyMinutesInput = document.getElementById("studyMinutes");
const startTimerBtn = document.getElementById("startTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(secondsLeft);
}

function runCountdown() {
  timerInterval = setInterval(() => {
    secondsLeft -= 1;
    updateTimerDisplay();

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerRunning = false;
      startTimerBtn.textContent = "▶ Start";
      timerDisplay.textContent = "00:00";
      timerMessage.textContent = "🎉 Session complete! Take a well-deserved break.";
    }
  }, 1000);
}

function startTimer() {
  if (timerRunning) return;

  const minutes = parseInt(studyMinutesInput.value, 10);
  if (isNaN(minutes) || minutes < 1) return;

  secondsLeft = minutes * 60;
  timerMessage.textContent = "🔥 Stay focused — you've got this!";
  timerRunning = true;
  startTimerBtn.textContent = "⏸ Pause";
  runCountdown();
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  startTimerBtn.textContent = "▶ Resume";
  timerMessage.textContent = "⏸ Paused — come back when you're ready!";
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  startTimerBtn.textContent = "▶ Start";
  const minutes = parseInt(studyMinutesInput.value, 10) || 25;
  secondsLeft = 0;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:00`;
  timerMessage.textContent = "";
}

startTimerBtn.addEventListener("click", () => {
  if (timerRunning) {
    pauseTimer();
  } else if (secondsLeft > 0) {
    // Resume
    timerRunning = true;
    startTimerBtn.textContent = "⏸ Pause";
    timerMessage.textContent = "🔥 Stay focused — you've got this!";
    runCountdown();
  } else {
    startTimer();
  }
});

resetTimerBtn.addEventListener("click", resetTimer);

studyMinutesInput.addEventListener("change", () => {
  if (!timerRunning && secondsLeft === 0) {
    const minutes = parseInt(studyMinutesInput.value, 10) || 25;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:00`;
  }
});

// Initialise display
const initMinutes = parseInt(studyMinutesInput.value, 10) || 25;
timerDisplay.textContent = `${String(initMinutes).padStart(2, "0")}:00`;

// ── Affirmations Carousel ────────────────────────────────
const affirmations = [
  "I am capable, prepared, and ready to succeed.",
  "Every challenge makes me stronger.",
  "I have worked hard and I trust my preparation.",
  "I stay calm, focused, and confident.",
  "Mistakes are part of learning — I grow with every attempt.",
  "I deserve success and I will achieve it.",
  "My potential is limitless.",
  "I am proud of how far I have come.",
];

let currentAffirmation = 0;
const affirmationText = document.getElementById("affirmationText");
const dotsContainer = document.getElementById("affirmationDots");

// Build dots
affirmations.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.classList.add("dot");
  dot.setAttribute("aria-label", `Affirmation ${i + 1}`);
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => showAffirmation(i));
  dotsContainer.appendChild(dot);
});

function showAffirmation(index) {
  affirmationText.classList.add("fade");
  setTimeout(() => {
    currentAffirmation = index;
    affirmationText.textContent = affirmations[index];
    affirmationText.classList.remove("fade");
    document.querySelectorAll(".dot").forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }, 500);
}

// Auto-rotate affirmations every 4 seconds
setInterval(() => {
  const next = (currentAffirmation + 1) % affirmations.length;
  showAffirmation(next);
}, 4000);
