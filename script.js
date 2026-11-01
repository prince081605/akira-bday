/* ============================================================
   ✏️  EDIT THE DETAILS HERE
   Everything on the page is filled in from this EVENT object.
   Replace the [bracketed] placeholders, save, then commit + push.
   ============================================================ */
const EVENT = {
  name: "Akira",

  ceremony: {
    // Date and time of the baptism: "YYYY-MM-DDTHH:MM" (24-hour clock)
    datetime: "2026-12-13T10:00",
    place: "[Church name]",
    address: "[Church address, City]",
  },

  reception: {
    time: "12:00 PM",
    place: "[Reception venue]",
    address: "[Venue address, City]",
  },

  notes: [
    "Come in your brightest outfit! Our colors are yellow, pink and teal.",
    "Please arrive 15 minutes before the ceremony starts.",
    "[Add another reminder, or delete this line]",
  ],

  message: [
    "With grateful hearts, we invite you to join us as Akira is welcomed into the faith through the Sacrament of Baptism.",
    "You have loved and prayed for our little one from the very beginning. It would mean so much to have you with us as we celebrate this blessing together.",
  ],
  from: "[Parents' names]",

  // Remove names you don't need. Leave the list empty to hide this part.
  godparents: ["[Ninong name]", "[Ninong name]", "[Ninang name]", "[Ninang name]"],

  rsvp: {
    by: "[RSVP date, e.g. December 1]",
    contact: "[Contact name]",
    phone: "",     // e.g. "0917 123 4567". While empty, the Call/Text buttons are greyed out.
    messenger: "", // optional, e.g. "https://m.me/your.username"
  },

  // Put photo files in the photos/ folder, then set src, e.g. "photos/1.jpg".
  // Tiles with an empty src show a colorful placeholder.
  photos: [
    { src: "", caption: "Our little blessing", emoji: "👶" },
    { src: "", caption: "Sweet dreams", emoji: "☁️" },
    { src: "", caption: "First smile", emoji: "💛" },
    { src: "", caption: "Tiny hands", emoji: "🤲" },
    { src: "", caption: "Family love", emoji: "🏡" },
    { src: "", caption: "Blessed day", emoji: "🕊️" },
  ],
};

/* ============================================================
   You don't need to edit anything below this line.
   ============================================================ */
const PALETTE = ["#FFD23F", "#FF6FA5", "#2EC4B6", "#5BC0EB"];
const ceremonyDate = new Date(EVENT.ceremony.datetime);
const dateLong = ceremonyDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
const timeShort = ceremonyDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

document.documentElement.classList.add("js");
document.title = `${EVENT.name}'s Baptism`;

const byId = (id) => document.getElementById(id);
const setText = (id, text) => { byId(id).textContent = text; };
const mapsLink = (place, address) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${place}, ${address}`);

function renderHero() {
  document.querySelectorAll("[data-name]").forEach((el) => { el.textContent = EVENT.name; });

  const letters = byId("name-letters");
  [...EVENT.name].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? " " : ch;
    span.style.setProperty("--i", i);
    span.style.setProperty("--c", PALETTE[i % PALETTE.length]);
    letters.append(span);
  });

  setText("hero-date", dateLong);
  setText("hero-time", timeShort);

  const sky = document.querySelector(".sky");
  for (let i = 0; i < 26; i++) {
    const s = document.createElement("span");
    s.className = "sprinkle";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.setProperty("--c", PALETTE[i % PALETTE.length]);
    s.style.setProperty("--r", `${Math.random() * 180}deg`);
    s.style.setProperty("--d", `${Math.random() * -4}s`);
    sky.append(s);
  }
}

function startCountdown() {
  const units = ["days", "hours", "minutes", "seconds"].map((u) => byId(`cd-${u}`));
  let timerId;

  function tick() {
    const now = new Date();
    const diff = ceremonyDate - now;

    if (diff <= 0) {
      const isToday = now.toDateString() === ceremonyDate.toDateString();
      byId("timer").hidden = true;
      byId("timer-done").hidden = false;
      setText("countdown-title", isToday ? "The big day is here!" : "What a blessed day it was");
      setText("timer-done", isToday ? "Today's the day! 🎉" : "Thank you for celebrating with us 💛");
      clearInterval(timerId);
      return;
    }

    const values = [
      Math.floor(diff / 864e5),
      Math.floor(diff / 36e5) % 24,
      Math.floor(diff / 6e4) % 60,
      Math.floor(diff / 1e3) % 60,
    ];
    values.forEach((v, i) => {
      const text = i === 0 ? String(v) : String(v).padStart(2, "0");
      const el = units[i];
      if (el.textContent === text) return;
      el.textContent = text;
      el.classList.remove("tick");
      void el.offsetWidth; // restart the pop animation
      el.classList.add("tick");
    });
  }

  tick();
  timerId = setInterval(tick, 1000);
}

function renderDetails() {
  const { ceremony, reception } = EVENT;

  setText("ceremony-when", timeShort);
  setText("ceremony-place", ceremony.place);
  setText("ceremony-address", ceremony.address);
  byId("ceremony-map").href = mapsLink(ceremony.place, ceremony.address);

  setText("reception-when", reception.time);
  setText("reception-place", reception.place);
  setText("reception-address", reception.address);
  byId("reception-map").href = mapsLink(reception.place, reception.address);

  byId("notes").replaceChildren(...EVENT.notes.map((note) => {
    const li = document.createElement("li");
    li.textContent = note;
    return li;
  }));
}

function renderMessage() {
  byId("message-body").replaceChildren(...EVENT.message.map((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  }));
  setText("message-from", EVENT.from);

  if (EVENT.godparents.length === 0) {
    byId("godparents").hidden = true;
    return;
  }
  byId("godparents-list").replaceChildren(...EVENT.godparents.map((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    return li;
  }));
}

function renderGallery() {
  byId("gallery-grid").replaceChildren(...EVENT.photos.map((photo, i) => {
    const tile = document.createElement("figure");
    tile.className = "tile";
    tile.style.setProperty("--c", PALETTE[i % PALETTE.length]);

    if (photo.src) {
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.caption;
      img.loading = "lazy";
      tile.append(img);
    } else {
      const emoji = document.createElement("span");
      emoji.className = "tile-emoji";
      emoji.setAttribute("aria-hidden", "true");
      emoji.textContent = photo.emoji;
      tile.append(emoji);
    }

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;
    tile.append(caption);
    return tile;
  }));
}

function renderRsvp() {
  const { by, contact, phone, messenger } = EVENT.rsvp;
  setText("rsvp-by", by);
  setText("rsvp-contact", contact);

  const number = phone.replace(/[^\d+]/g, "");
  const call = byId("rsvp-call");
  const text = byId("rsvp-text");
  if (number) {
    call.href = `tel:${number}`;
    text.href = `sms:${number}`;
  } else {
    [call, text].forEach((btn) => {
      btn.setAttribute("aria-disabled", "true");
      btn.title = "Add a phone number in script.js";
    });
  }

  if (messenger) {
    const btn = byId("rsvp-messenger");
    btn.href = messenger;
    btn.hidden = false;
  }
}

function celebrate(power = 1) {
  if (typeof confetti !== "function") return;
  const base = { colors: [...PALETTE, "#FFFFFF"], disableForReducedMotion: true, zIndex: 100 };
  confetti({ ...base, particleCount: Math.round(110 * power), spread: 80, startVelocity: 45, origin: { y: 0.65 } });
  if (power < 1) return;
  confetti({ ...base, particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
  confetti({ ...base, particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
}

function setupCelebrate() {
  const btn = byId("celebrate");
  btn.addEventListener("click", () => {
    celebrate();
    btn.classList.remove("wiggle");
    void btn.offsetWidth;
    btn.classList.add("wiggle");
  });
  window.addEventListener("load", () => setTimeout(() => celebrate(0.4), 700));
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
}

renderHero();
startCountdown();
renderDetails();
renderMessage();
renderGallery();
renderRsvp();
setupCelebrate();
setupReveal();
