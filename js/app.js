const FAVORITES_KEY = "quoteGenFavorites";

const els = {
  quoteBlock: document.getElementById("quoteBlock"),
  quoteText: document.getElementById("quoteText"),
  quoteAuthor: document.getElementById("quoteAuthor"),
  categoryRow: document.getElementById("categoryRow"),
  newQuoteBtn: document.getElementById("newQuoteBtn"),
  favoriteBtn: document.getElementById("favoriteBtn"),
  copyBtn: document.getElementById("copyBtn"),
  shareBtn: document.getElementById("shareBtn"),
  toast: document.getElementById("toast"),
  favoritesToggle: document.getElementById("favoritesToggle"),
  favoritesCount: document.getElementById("favoritesCount"),
  favoritesSection: document.getElementById("favoritesSection"),
  favoritesList: document.getElementById("favoritesList"),
  favoritesEmpty: document.getElementById("favoritesEmpty"),
};

let currentCategory = "all";
let currentQuote = null;
let favorites = loadFavorites();

// ---- Favorites persistence ----
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(quote) {
  return favorites.some((f) => f.text === quote.text && f.author === quote.author);
}

function toggleFavorite(quote) {
  if (isFavorite(quote)) {
    favorites = favorites.filter((f) => !(f.text === quote.text && f.author === quote.author));
  } else {
    favorites.push(quote);
  }
  saveFavorites();
  renderFavoriteButton();
  renderFavoritesList();
}

function removeFavorite(quote) {
  favorites = favorites.filter((f) => !(f.text === quote.text && f.author === quote.author));
  saveFavorites();
  renderFavoriteButton();
  renderFavoritesList();
}

// ---- Categories ----
function getCategories() {
  return ["all", ...new Set(QUOTES.map((q) => q.category))];
}

function renderCategories() {
  els.categoryRow.innerHTML = getCategories()
    .map(
      (cat) => `
    <button type="button" class="category ${cat === currentCategory ? "is-active" : ""}" data-category="${cat}">
      ${cat}
    </button>
  `
    )
    .join("");
}

function setCategory(category) {
  currentCategory = category;
  els.categoryRow.querySelectorAll(".category").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.category === category);
  });
  showNewQuote();
}

els.categoryRow.addEventListener("click", (e) => {
  const btn = e.target.closest(".category");
  if (!btn) return;
  setCategory(btn.dataset.category);
});

// ---- Quote selection + rendering ----
function pickQuote() {
  const pool = currentCategory === "all" ? QUOTES : QUOTES.filter((q) => q.category === currentCategory);
  if (pool.length === 0) return QUOTES[0];
  if (pool.length === 1) return pool[0];

  let next;
  do {
    next = pool[Math.floor(Math.random() * pool.length)];
  } while (currentQuote && next.text === currentQuote.text);
  return next;
}

function renderFavoriteButton() {
  const active = currentQuote && isFavorite(currentQuote);
  els.favoriteBtn.classList.toggle("is-active", !!active);
  els.favoriteBtn.setAttribute("aria-pressed", String(!!active));
}

function renderQuote(quote) {
  els.quoteText.textContent = quote.text;
  els.quoteAuthor.textContent = quote.author;
  renderFavoriteButton();
}

function showNewQuote() {
  currentQuote = pickQuote();
  els.quoteBlock.classList.add("is-fading");
  setTimeout(() => {
    renderQuote(currentQuote);
    els.quoteBlock.classList.remove("is-fading");
  }, 180);
}

els.newQuoteBtn.addEventListener("click", showNewQuote);

// ---- Favorite toggle button ----
els.favoriteBtn.addEventListener("click", () => {
  if (currentQuote) toggleFavorite(currentQuote);
});

// ---- Copy to clipboard ----
let toastTimer = null;
function showToast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  requestAnimationFrame(() => els.toast.classList.add("is-visible"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.classList.remove("is-visible");
    setTimeout(() => (els.toast.hidden = true), 200);
  }, 1800);
}

els.copyBtn.addEventListener("click", async () => {
  if (!currentQuote) return;
  const text = `"${currentQuote.text}" — ${currentQuote.author}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
  } catch {
    showToast("Couldn't copy — try selecting manually");
  }
});

// ---- Share on X ----
els.shareBtn.addEventListener("click", () => {
  if (!currentQuote) return;
  const text = `"${currentQuote.text}" — ${currentQuote.author}`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

// ---- Favorites list ----
function renderFavoritesList() {
  els.favoritesCount.textContent = `(${favorites.length})`;

  if (favorites.length === 0) {
    els.favoritesList.innerHTML = "";
    els.favoritesEmpty.hidden = false;
    return;
  }

  els.favoritesEmpty.hidden = true;
  els.favoritesList.innerHTML = favorites
    .map(
      (f, i) => `
    <li class="favorite-item">
      <div>
        <p class="favorite-item__text">"${f.text}"</p>
        <p class="favorite-item__author">&mdash; ${f.author}</p>
      </div>
      <button type="button" class="favorite-item__remove" data-index="${i}">Remove</button>
    </li>
  `
    )
    .join("");
}

els.favoritesList.addEventListener("click", (e) => {
  const btn = e.target.closest(".favorite-item__remove");
  if (!btn) return;
  const quote = favorites[Number(btn.dataset.index)];
  if (quote) removeFavorite(quote);
});

els.favoritesToggle.addEventListener("click", () => {
  els.favoritesSection.hidden = !els.favoritesSection.hidden;
});

// ---- Keyboard ----
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key.toLowerCase() === "n") {
    e.preventDefault();
    showNewQuote();
  }
});

// ---- Init ----
renderCategories();
renderFavoritesList();
currentQuote = pickQuote();
renderQuote(currentQuote);
