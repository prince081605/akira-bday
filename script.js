/* ============================================================
   ✏️  EDIT THE DETAILS HERE
   Everything on the page is filled in from this EVENT object.
   Fill in the empty "" fields when you have them, save, then commit + push.
   ============================================================ */
const EVENT = {
  name: "Akira",

  ceremony: {
    // Date and time of the baptism: "YYYY-MM-DDTHH:MM" (24-hour clock)
    datetime: "2027-01-23T08:00",
    // When it ends, same format. Leave "" to show only the start time.
    ends: "2027-01-23T08:30",
    place: "Hearts of Jesus and Mary Parish",
    address: "24 USAFFE Road, Brgy. Holy Spirit, Quezon City",
  },

  // The Reception card stays hidden while place is "".
  reception: {
    time: "",
    place: "",
    address: "",
  },

  // Shown at the top of the "Before you board" card, with a dot for each color.
  // Leave the list empty to hide it.
  dressCode: [
    { who: "Ladies", wear: "Light brown or brown", colors: ["#D2A679", "#8B5A2B"] },
    { who: "Gentlemen", wear: "Black", colors: ["#111111"] },
  ],

  notes: [
    "Our theme is CoComelon's Wheels on the Bus!",
    "Please arrive 15 minutes early so we can start right on time.",
  ],

  message: [
    "With grateful hearts, we invite you to join us as Akira is welcomed into the faith through the Sacrament of Baptism.",
    "You have loved and prayed for our little one from the very beginning. It would mean so much to have you with us as we celebrate this blessing together.",
  ],
  from: "Wellbert & Messy Estrella",

  // Add names like "Juan Dela Cruz". Leave the list empty to hide this part.
  godparents: [],

  // The RSVP section stays hidden while all of these are "", and after the baptism day.
  rsvp: {
    by: "",        // e.g. "January 10"
    contact: "",   // e.g. "Messy"
    phone: "",     // e.g. "0917 123 4567". Shows the Call/Text buttons.
    messenger: "", // optional, e.g. "https://m.me/your.username"
    // The RSVP form sends answers to your Google Sheet. Follow rsvp/README.txt to get this link,
    // e.g. "https://script.google.com/macros/s/.../exec". The form stays hidden while it is "".
    formUrl: "https://script.google.com/macros/s/AKfycbzoDIy2xPr1aRKkpalsQud4TXz7FCDKcHwV90_Q6HctREJbo44ySdbXCpYPD9R9L0-7XA/exec",
    // How many other people (kids too) one guest can add to their RSVP.
    maxGuests: 4,
  },

  // Gift ideas for guests who ask what to bring. Leave ideas empty to hide this part.
  gifts: {
    intro: "Your presence is the best gift of all! If you'd like to bring something, here are a few ideas.",
    ideas: [
      { emoji: "🍼", title: "Baby essentials", text: "Diapers, wipes, baby wash and lotion: the things we use every day." },
      { emoji: "👕", title: "Clothes", text: "Comfy everyday clothes and shoes for a growing little one. Ask us for the current size." },
      { emoji: "💌", title: "Monetary gift", text: "A cash gift in an envelope, to help with Akira's needs and savings." },
      { emoji: "🧸", title: "Other necessities", text: "Feeding sets, bath towels, board books or learning toys." },
    ],
  },

  // Put photo files in the photos/ folder, then set src, e.g. "photos/1.jpg".
  // Tiles with an empty src show a colorful placeholder.
  // Tiles are square, so tall photos get trimmed top and bottom. Add focus: "bottom" (or "top")
  // to keep that part of the photo in view.
  photos: [
    { src: "photos/little-blessing.jpg", caption: "Our little blessing", emoji: "👶" },
    { src: "photos/little-passenger.jpg", caption: "Our little passenger", emoji: "🚌" },
    { src: "photos/one-in-a-melon.jpg", caption: "One in a melon", emoji: "🍉" },
    { src: "photos/tiny-hands.jpg", caption: "Tiny hands", emoji: "🤲", focus: "bottom" },
    { src: "photos/happy-family.jpg", caption: "Happy family", emoji: "🏡" },
    { src: "photos/blessed-day.jpg", caption: "Blessed day", emoji: "🕊️" },
  ],

  // Music starts when a guest taps "Beep beep!". To use your own song, put an MP3 or M4A in the
  // music/ folder and set its path, e.g. "music/song.mp3". Leave "" for the built-in tune.
  music: "music/wheels-on-the-bus.m4a",
};

/* ============================================================
   You don't need to edit anything below this line.
   ============================================================ */
const PALETTE = ["#FFC93C", "#FF6B6B", "#5BC0EB", "#8BD46E"];
const ceremonyDate = new Date(EVENT.ceremony.datetime);
const endDate = EVENT.ceremony.ends ? new Date(EVENT.ceremony.ends) : null;
const dateLong = ceremonyDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
const dateShort = ceremonyDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
const dateDay = ceremonyDate.toLocaleDateString("en-US", { month: "long", day: "numeric" });
const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
const timeShort = endDate && timeFormat.formatRange
  ? timeFormat.formatRange(ceremonyDate, endDate)
  : timeFormat.format(ceremonyDate);

document.documentElement.classList.add("js");
document.title = `${EVENT.name}'s Baptism`;

const byId = (id) => document.getElementById(id);
const setText = (id, text) => { byId(id).textContent = text; };
const mapsLink = (place, address) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${place}, ${address}`);
const replay = (el, className) => {
  el.classList.remove(className);
  void el.offsetWidth; // restart the CSS animation
  el.classList.add(className);
};

function renderHero() {
  document.querySelectorAll("[data-name]").forEach((el) => { el.textContent = EVENT.name; });

  const letters = byId("name-letters");
  [...EVENT.name].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? " " : ch;
    span.style.setProperty("--i", i);
    span.style.setProperty("--c", PALETTE[i % PALETTE.length]);
    letters.append(span);
  });

  setText("hero-date", dateLong);
  setText("hero-time", timeShort);

  // Music notes floating in the sky
  const sky = document.querySelector(".sky");
  const notes = ["♪", "♫", "♬"];
  for (let i = 0; i < 16; i++) {
    const n = document.createElement("span");
    n.className = "note";
    n.textContent = notes[i % notes.length] + "︎";
    n.style.left = `${Math.random() * 94}%`;
    n.style.top = `${Math.random() * 60}%`;
    n.style.setProperty("--c", PALETTE[i % PALETTE.length]);
    n.style.setProperty("--r", `${Math.random() * 40 - 20}deg`);
    n.style.setProperty("--d", `${Math.random() * -5}s`);
    sky.append(n);
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
      setText("timer-done", isToday ? "Today's the day! 🚌🎉" : "Thank you for celebrating with us 💛");
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
      replay(el, "tick");
    });
  }

  tick();
  timerId = setInterval(tick, 1000);
}

function renderDetails() {
  const { ceremony, reception } = EVENT;

  setText("ceremony-when", `${dateShort} · ${timeShort}`);
  setText("ceremony-place", ceremony.place);
  setText("ceremony-address", ceremony.address);
  byId("ceremony-map").href = mapsLink(ceremony.place, ceremony.address);

  if (reception.place) {
    setText("reception-when", reception.time);
    setText("reception-place", reception.place);
    setText("reception-address", reception.address);
    byId("reception-map").href = mapsLink(reception.place, reception.address);
  } else {
    byId("reception-card").hidden = true;
  }

  if (EVENT.dressCode.length === 0) {
    byId("dress-code").hidden = true;
  } else {
    byId("dress-list").replaceChildren(...EVENT.dressCode.map(({ who, wear, colors }) => {
      const li = document.createElement("li");
      const swatches = document.createElement("span");
      swatches.className = "swatches";
      swatches.setAttribute("aria-hidden", "true");
      colors.forEach((color) => {
        const dot = document.createElement("span");
        dot.className = "swatch";
        dot.style.setProperty("--s", color);
        swatches.append(dot);
      });
      const label = document.createElement("strong");
      label.textContent = `${who}:`;
      const text = document.createElement("span");
      text.append(label, ` ${wear}`);
      li.append(swatches, text);
      return li;
    }));
  }

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
      if (photo.focus) img.style.objectPosition = `center ${photo.focus}`;
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

function renderGifts() {
  const { intro, ideas } = EVENT.gifts;
  if (ideas.length === 0) {
    byId("gifts").hidden = true;
    return;
  }
  setText("gifts-intro", intro);
  byId("gift-grid").replaceChildren(...ideas.map((idea, i) => {
    const card = document.createElement("article");
    card.className = "gift";
    card.style.setProperty("--c", PALETTE[i % PALETTE.length]);

    const emoji = document.createElement("span");
    emoji.className = "gift-emoji";
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = idea.emoji;
    const title = document.createElement("h3");
    title.textContent = idea.title;
    const text = document.createElement("p");
    text.textContent = idea.text;

    card.append(emoji, title, text);
    return card;
  }));
}

function renderRsvp() {
  const { by, contact, phone, messenger, formUrl } = EVENT.rsvp;
  const number = phone.replace(/[^\d+]/g, "");

  if (ceremonyDate < new Date() || (!by && !contact && !number && !messenger && !formUrl)) {
    byId("rsvp").hidden = true;
    return;
  }

  setText("rsvp-by", by);
  setText("rsvp-contact", contact);
  byId("rsvp-by").parentElement.hidden = !by;
  byId("rsvp-contact").parentElement.hidden = !contact;
  byId("rsvp-reach").hidden = !contact && !number && !messenger;
  if (formUrl) {
    setText("rsvp-contact-lead", "Questions? Contact");
    setupRsvpForm(formUrl);
  }

  const call = byId("rsvp-call");
  const text = byId("rsvp-text");
  if (number) {
    call.href = `tel:${number}`;
    text.href = `sms:${number}`;
  } else {
    call.hidden = true;
    text.hidden = true;
  }

  if (messenger) {
    const btn = byId("rsvp-messenger");
    btn.href = messenger;
    btn.hidden = false;
  }
}

// Remembers the guest's answer on their phone, so coming back shows "You're on the bus!" again.
const RSVP_KEY = "rsvp";
const savedRsvp = {
  get() {
    try {
      const answer = JSON.parse(localStorage.getItem(RSVP_KEY));
      return answer?.id && answer.name && Array.isArray(answer.guests) ? answer : null;
    } catch {
      return null;
    }
  },
  set(answer) {
    try {
      localStorage.setItem(RSVP_KEY, JSON.stringify(answer));
    } catch {
      // Private browsing or storage blocked: the answer is still sent, just not remembered here.
    }
  },
};
const newId = () => crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

function setupRsvpForm(url) {
  const form = byId("rsvp-form");
  const fields = form.elements;
  const list = byId("guest-list");
  const submit = byId("rsvp-submit");
  const submitLabel = submit.textContent;
  const { maxGuests, contact } = EVENT.rsvp;
  let saved = savedRsvp.get();

  const guestInputs = () => [...list.querySelectorAll("input")];
  const guestNames = () => guestInputs().map((input) => input.value.trim()).filter(Boolean);
  const attending = () => fields.attending.value === "yes";
  const bringing = () => attending() && maxGuests > 0 && fields.bringing.value === "yes";

  function addGuest(name = "") {
    const row = byId("guest-row").content.firstElementChild.cloneNode(true);
    const input = row.querySelector("input");
    input.value = name;
    row.querySelector("button").addEventListener("click", () => {
      row.remove();
      update();
      list.lastElementChild.querySelector("input").focus();
    });
    list.append(row);
    update();
    return input;
  }

  function update() {
    byId("rsvp-bringing").hidden = !attending() || maxGuests < 1;
    byId("rsvp-guests").hidden = !bringing();
    if (bringing() && list.children.length === 0) addGuest();

    const full = list.children.length >= maxGuests;
    byId("add-guest").hidden = full;
    byId("guest-max").hidden = !full;
    guestInputs().forEach((input, i) => {
      input.setAttribute("aria-label", `Guest ${i + 1} name`);
      input.nextElementSibling.setAttribute("aria-label", `Remove guest ${i + 1}`);
    });

    const seats = 1 + (bringing() ? guestNames().length : 0);
    byId("seat-count").hidden = !attending();
    setText("seat-count", `🚌 Seats to save: ${seats}`);
  }

  function problem() {
    if (!fields.name.value.trim()) return [fields.name, "Please type your name."];
    if (!fields.attending.value) return [fields.attending[0], "Please let us know if you can come."];
    if (attending() && maxGuests > 0 && !fields.bringing.value) {
      return [fields.bringing[0], "Please let us know if you're bringing anyone."];
    }
    const empty = bringing() && guestInputs().find((input) => !input.value.trim());
    if (empty) return [empty, "Please add the name of each person you're bringing, or remove the empty line."];
    return null;
  }

  function showError(text) {
    setText("rsvp-error", text);
    byId("rsvp-error").hidden = !text;
  }

  function fill(answer) {
    fields.name.value = answer.name;
    fields.attending.value = answer.attending;
    fields.bringing.value = answer.guests.length ? "yes" : "no";
    list.replaceChildren();
    answer.guests.forEach((name) => addGuest(name));
    fields.message.value = answer.message;
    update();
  }

  function showDone(answer) {
    const seats = 1 + answer.guests.length;
    const coming = answer.attending === "yes";
    setText("rsvp-done-title", coming ? `You're on the bus, ${answer.name}! 🎉` : `Thanks for letting us know, ${answer.name}.`);
    setText("rsvp-done-text", coming
      ? `We saved ${seats === 1 ? "1 seat" : `${seats} seats`} for you. See you on ${dateDay}!`
      : `We'll miss you! Please keep ${EVENT.name} in your prayers. 💛`);
    form.hidden = true;
    byId("rsvp-done").hidden = false;
  }

  form.addEventListener("input", update);
  byId("add-guest").addEventListener("click", () => addGuest().focus());
  byId("rsvp-edit").addEventListener("click", () => {
    byId("rsvp-done").hidden = true;
    form.hidden = false;
    fields.name.focus();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const found = problem();
    if (found) {
      showError(found[1]);
      found[0].focus();
      return;
    }

    const answer = {
      // Sending again from the same phone updates the same row in the sheet instead of adding one.
      id: saved?.id || newId(),
      name: fields.name.value.trim(),
      attending: fields.attending.value,
      guests: bringing() ? guestNames() : [],
      message: fields.message.value.trim(),
    };
    showError("");
    submit.disabled = true;
    submit.textContent = "Sending…";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({ ...answer, guests: answer.guests.join("\n") }),
      });
      const reply = await res.json();
      if (!reply.ok) throw new Error(reply.error);
      saved = answer;
      savedRsvp.set(answer);
      showDone(answer);
      byId("rsvp-done").focus();
      if (answer.attending === "yes") celebrate(0.6);
    } catch {
      showError(`Sorry, we couldn't save your answer. Please check your internet and try again.${contact ? ` You can also message ${contact}.` : ""}`);
    } finally {
      submit.disabled = false;
      submit.textContent = submitLabel;
    }
  });

  form.hidden = false;
  if (saved) {
    fill(saved);
    showDone(saved);
  } else {
    update();
  }
}

let busShape;
function celebrate(power = 1) {
  if (typeof confetti !== "function") return;
  const base = { colors: [...PALETTE, "#FFFFFF"], disableForReducedMotion: true, zIndex: 100 };
  confetti({ ...base, particleCount: Math.round(110 * power), spread: 80, startVelocity: 45, origin: { y: 0.65 } });
  if (power < 1) return;
  confetti({ ...base, particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
  confetti({ ...base, particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });

  if (!confetti.shapeFromText) return;
  busShape ??= confetti.shapeFromText({ text: "🚌", scalar: 2.4 });
  confetti({ ...base, shapes: [busShape], scalar: 2.4, particleCount: 12, spread: 100, startVelocity: 38, origin: { y: 0.6 } });
}

let audio;
function getAudio() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  audio ??= new AudioCtx();
  if (audio.state !== "running") audio.resume();
  return audio;
}

// A short two-tone "beep beep", made in the browser so there is no sound file to load.
function honk() {
  if (!getAudio()) return;
  const now = audio.currentTime;
  [0, 0.22].forEach((start) => {
    [392, 494].forEach((freq) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.05, now + start + 0.02);
      gain.gain.setValueAtTime(0.05, now + start + 0.13);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + 0.18);
      osc.connect(gain).connect(audio.destination);
      osc.start(now + start);
      osc.stop(now + start + 0.2);
    });
  });
}

// The built-in tune: an original little melody, as [note, length in eighth notes].
const TUNE = [
  ["C5", 1], ["E5", 1], ["G5", 1], ["E5", 1], ["C5", 2], ["G4", 2],
  ["A4", 1], ["C5", 1], ["F5", 1], ["E5", 1], ["D5", 4],
  ["G4", 1], ["B4", 1], ["D5", 1], ["F5", 1], ["E5", 2], ["C5", 2],
  ["D5", 1], ["C5", 1], ["B4", 1], ["A4", 1], ["G4", 4],
  ["C5", 1], ["E5", 1], ["G5", 1], ["A5", 1], ["G5", 2], ["E5", 2],
  ["F5", 1], ["A5", 1], ["G5", 1], ["F5", 1], ["E5", 2], ["C5", 2],
  ["D5", 1], ["F5", 1], ["E5", 1], ["D5", 1], ["C5", 1], ["D5", 1], ["E5", 1], ["G4", 1],
  ["C5", 2], ["G4", 1], ["E4", 1], ["C4", 4],
];
// Bass notes on beats 1 and 3 of each bar
const BASS = ["C3", "G3", "F3", "C4", "G3", "D4", "G3", "D4", "C3", "G3", "F3", "C4", "G3", "D4", "C3", "G3"];
const EIGHTH = 60 / 132 / 2; // seconds
const LOOP = TUNE.reduce((sum, [, len]) => sum + len, 0);
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const noteFreq = (name) => {
  const midi = NOTE_NAMES.indexOf(name.slice(0, -1)) + (Number(name.slice(-1)) + 1) * 12;
  return 440 * 2 ** ((midi - 69) / 12);
};

const TUNE_NOTES = (() => {
  const notes = [];
  let at = 0;
  TUNE.forEach(([note, len]) => {
    notes.push({ at, note, len, peak: 0.5 });
    at += len;
  });
  BASS.forEach((note, i) => notes.push({ at: i * 4, note, len: 3, peak: 0.35 }));
  return notes.sort((a, b) => a.at - b.at);
})();

let tuneOut;
let tuneTimer;

function playNote({ note, len, peak }, when) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const end = when + Math.min(len * EIGHTH, 0.5);
  osc.type = "triangle";
  osc.frequency.value = noteFreq(note);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(gain).connect(tuneOut);
  osc.start(when);
  osc.stop(end + 0.02);
}

function startTune() {
  if (tuneTimer || !getAudio()) return;
  if (!tuneOut) {
    tuneOut = audio.createGain();
    tuneOut.connect(audio.destination);
  }
  tuneOut.gain.cancelScheduledValues(audio.currentTime);
  tuneOut.gain.setValueAtTime(0.18, audio.currentTime);

  // Schedule notes a little ahead of time so the beat stays steady.
  let i = 0;
  let loopStart = audio.currentTime + 0.5; // let the honk finish first
  const schedule = () => {
    while (loopStart + TUNE_NOTES[i].at * EIGHTH < audio.currentTime + 0.25) {
      playNote(TUNE_NOTES[i], loopStart + TUNE_NOTES[i].at * EIGHTH);
      i += 1;
      if (i === TUNE_NOTES.length) {
        i = 0;
        loopStart += LOOP * EIGHTH;
      }
    }
  };
  schedule();
  tuneTimer = setInterval(schedule, 60);
}

function stopTune() {
  if (!tuneTimer) return;
  clearInterval(tuneTimer);
  tuneTimer = null;
  tuneOut.gain.setTargetAtTime(0, audio.currentTime, 0.05);
}

let musicOn = false;
let musicFile;

function playMusic() {
  if (!EVENT.music) {
    startTune();
    return;
  }
  musicFile ??= Object.assign(new Audio(EVENT.music), { loop: true, volume: 0.6 });
  musicFile.play().catch(() => {
    // The file is missing or can't play here: use the built-in tune instead.
    EVENT.music = "";
    if (musicOn) startTune();
  });
}

function pauseMusic() {
  musicFile?.pause();
  stopTune();
}

function setMusic(on) {
  musicOn = on;
  const btn = byId("music-toggle");
  btn.hidden = false;
  btn.setAttribute("aria-pressed", String(on));
  btn.setAttribute("aria-label", on ? "Pause music" : "Play music");
  btn.firstElementChild.textContent = on ? "🎵" : "🔇";
  if (on) playMusic();
  else pauseMusic();
}

function setupMusic() {
  byId("music-toggle").addEventListener("click", () => setMusic(!musicOn));
  // Pause while the guest is in another tab or app, and pick up again when they come back.
  document.addEventListener("visibilitychange", () => {
    if (!musicOn) return;
    if (document.hidden) pauseMusic();
    else playMusic();
  });
}

function setupCelebrate() {
  const btn = byId("celebrate");
  let musicStarted = false;
  btn.addEventListener("click", () => {
    celebrate();
    honk();
    replay(btn, "wiggle");
    replay(byId("hero-bus"), "hop");
    // The first tap also starts the music. After that, the music button turns it on and off.
    if (!musicStarted) {
      musicStarted = true;
      setMusic(true);
    }
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
renderGifts();
renderRsvp();
setupMusic();
setupCelebrate();
setupReveal();
