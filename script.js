const bookingForm = document.getElementById("booking-form");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");
const themeToggle = document.querySelector("[data-theme-toggle]");

const applyTheme = (mode) => {
  document.body.classList.toggle("theme-dark", mode === "dark");
  localStorage.setItem("theme", mode);
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  applyTheme(storedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    applyTheme(isDark ? "light" : "dark");
  });
}

const knowledgeBase = [
  {
    match: ["experience", "background", "summary", "who are you"],
    answer:
      "I’m Sani (Ehsan Mohajer), a Project Specialist and Full‑Stack Developer based in Central Finland. I connect talent, tech, and business, and I’ve hosted 3 hackathons plus 2 AI hackathons. I currently work at Kehittämisyhtiö Witas Oy and study MSc Full‑Stack Software Development at JAMK (2023–2026).",
  },
  {
    match: ["ai", "agent", "automation"],
    answer:
      "My AI focus is on agentic workflows, automation, and LLM‑powered tools. I design systems that reduce wasted time and energy while keeping humans in the loop.",
  },
  {
    match: ["hackathon", "events"],
    answer:
      "I’ve organized 3 hackathons and 2 AI hackathons in Central Finland, connecting students and local companies through innovation challenges.",
  },
  {
    match: ["restaurant", "pizza", "kebab"],
    answer:
      "The Saaren Pizza & Kebab platform is a full restaurant website with online ordering, real‑time tracking, reservations, email verification, and a bilingual interface built in React 19, TypeScript, and Tailwind CSS.",
  },
  {
    match: ["tourism"],
    answer:
      "I’m currently building a tourism platform for Central Finland that blends storytelling, local business discovery, and smart itinerary planning.",
  },
  {
    match: ["book", "consult", "session", "meeting"],
    answer:
      "You can book a consulting session by filling the form in the Consulting section. I reply with available time slots within 24 hours.",
  },
  {
    match: ["contact", "email", "linkedin", "whatsapp"],
    answer:
      "You can reach me at ehsanmohajer.fi@gmail.com or via LinkedIn and WhatsApp. The Contact section has direct links.",
  },
];

function addMessage(text, sender, logEl) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  logEl.appendChild(bubble);
  logEl.scrollTop = logEl.scrollHeight;
}

function findAnswer(question) {
  const normalized = question.toLowerCase();
  const match = knowledgeBase.find((item) =>
    item.match.some((keyword) => normalized.includes(keyword))
  );
  return (
    match?.answer ||
    "I can help with my AI work, hackathons, projects, or consulting. Try asking about AI agents, the restaurant project, or how to book a session."
  );
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(bookingForm);
    const name = data.get("name");
    const email = data.get("email");
    const topic = data.get("topic");
    const time = data.get("time");

    const subject = encodeURIComponent("Consulting session request");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\nPreferred time: ${time}`
    );
    window.location.href = `mailto:ehsanmohajer.fi@gmail.com?subject=${subject}&body=${body}`;
  });
}

const initChat = (formEl, inputEl, logEl) => {
  if (!formEl || !inputEl || !logEl) return;
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = inputEl.value.trim();
    if (!question) return;
    addMessage(question, "user", logEl);
    inputEl.value = "";
    const reply = findAnswer(question);
    setTimeout(() => addMessage(reply, "bot", logEl), 250);
  });
};

if (chatForm && chatInput && chatLog) {
  initChat(chatForm, chatInput, chatLog);
}

document.querySelectorAll("[data-chat]").forEach((chatBox) => {
  const formEl = chatBox.querySelector("[data-chat-form]");
  const inputEl = chatBox.querySelector("[data-chat-input]");
  const logEl = chatBox.querySelector("[data-chat-log]");
  initChat(formEl, inputEl, logEl);
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.getAttribute("data-prompt");
    if (!prompt || !chatLog) return;
    addMessage(prompt, "user", chatLog);
    const reply = findAnswer(prompt);
    setTimeout(() => addMessage(reply, "bot", chatLog), 200);
  });
});

document.querySelectorAll("[data-chat-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const widget = document.querySelector(".chat-widget");
    if (!widget) return;
    widget.classList.toggle("open");
  });
});

const revealElements = document.querySelectorAll("[data-reveal]");
const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", () => {
  revealOnScroll();
  if (chatLog) {
    addMessage(
      "Hi! I’m Sani’s resume agent. Ask me about his AI work, hackathons, or projects.",
      "bot",
      chatLog
    );
  }
  document.querySelectorAll("[data-chat-log]").forEach((logEl) => {
    addMessage(
      "Hi! I’m Sani’s resume agent. Ask me about AI work, hackathons, or projects.",
      "bot",
      logEl
    );
  });
});
