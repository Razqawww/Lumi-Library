/* Lumi Library — script.js
   To add a book: add one line to BOOKS: [title, author, categoryKey, rating, description]
   Category keys: F=Fiction S=Science T=Technology E=Education H=History B=Business D=Self Development M=Mystery */

const CATEGORIES = {
  F: { name: "Fiction", icon: "📖", c: ["#14284b", "#3b6bb5"] },
  S: { name: "Science", icon: "🔬", c: ["#0f4c5c", "#3fa7b8"] },
  T: { name: "Technology", icon: "💻", c: ["#1b2a6b", "#5a6fe0"] },
  E: { name: "Education", icon: "🎓", c: ["#2d3a8c", "#7d8fd8"] },
  H: { name: "History", icon: "🏛️", c: ["#3a3f5c", "#8790b8"] },
  B: { name: "Business", icon: "📈", c: ["#17405e", "#4f8fc0"] },
  D: { name: "Self Development", icon: "🌱", c: ["#1d4d6b", "#62a8cf"] },
  M: { name: "Mystery", icon: "🔍", c: ["#101a33", "#46598f"] }
};

const RAW = [
  ["The Great Gatsby","F. Scott Fitzgerald","F",4.4,"A jazz-age story of wealth, longing and the cost of reinventing yourself."],
  ["Pride and Prejudice","Jane Austen","F",4.7,"Elizabeth Bennet and Mr. Darcy navigate manners, money and first impressions."],
  ["Alice's Adventures in Wonderland","Lewis Carroll","F",4.3,"A curious girl follows a rabbit into a world where logic turns upside down."],
  ["Little Women","Louisa May Alcott","F",4.5,"Four sisters grow up together, chasing dreams in post-war New England."],
  ["Romeo and Juliet","William Shakespeare","F",4.3,"Two young lovers from feuding families face a tragic fate in Verona."],
  ["The Hobbit","J.R.R. Tolkien","F",4.8,"Bilbo Baggins leaves his quiet home for a dragon-guarded treasure."],
  ["Laskar Pelangi","Andrea Hirata","F",4.6,"Ten children and two teachers fight to keep a small village school alive."],
  ["Bumi Manusia","Pramoedya Ananta Toer","F",4.7,"A young Javanese student confronts colonial society and finds love and courage."],
  ["Negeri 5 Menara","Ahmad Fuadi","F",4.4,"Six friends at a pesantren learn that effort and dreams can travel the world."],
  ["Hujan","Tere Liye","F",4.3,"A near-future story of loss, memory and a love shaped by disaster."],
  ["Laut Bercerita","Leila S. Chudori","F",4.6,"A moving novel about student activists and the families waiting for them."],
  ["Pulang","Leila S. Chudori","F",4.5,"Indonesian exiles in Paris carry home in their memories across decades."],
  ["Dune","Frank Herbert","F",4.7,"On a desert planet, a young heir is drawn into war over a precious resource."],
  ["The Martian","Andy Weir","F",4.7,"An astronaut stranded on Mars uses science and humor to survive."],
  ["The Little Prince","Antoine de Saint-Exupéry","F",4.8,"A pilot meets a small prince who sees what adults often forget."],
  ["Frankenstein","Mary Shelley","F",4.2,"A scientist's creation raises hard questions about responsibility and ambition."],
  ["The Time Machine","H. G. Wells","F",4.1,"An inventor travels to the distant future and finds a divided humanity."],
  ["The Adventures of Sherlock Holmes","Arthur Conan Doyle","M",4.6,"Twelve classic cases solved by observation, logic and a sharp eye for detail."],
  ["And Then There Were None","Agatha Christie","M",4.7,"Ten strangers on an island are removed one by one."],
  ["Murder on the Orient Express","Agatha Christie","M",4.5,"Detective Poirot investigates a murder aboard a snowbound train."],
  ["The Hound of the Baskervilles","Arthur Conan Doyle","M",4.4,"Holmes and Watson face a legendary beast haunting the moors."],
  ["Treasure Island","Robert Louis Stevenson","M",4.3,"A boy, a map and a crew of pirates set off in search of buried gold."],
  ["The Call of the Wild","Jack London","M",4.2,"A domestic dog is thrown into the harsh Yukon and discovers his wild side."],
  ["Journey to the Center of the Earth","Jules Verne","M",4.2,"A professor and his nephew descend into a volcano to explore the unknown."],
  ["A Brief History of Time","Stephen Hawking","S",4.5,"A clear tour of black holes, the Big Bang and the nature of time."],
  ["Cosmos","Carl Sagan","S",4.8,"A sweeping journey through the universe and humanity's place in it."],
  ["The Selfish Gene","Richard Dawkins","S",4.3,"A gene-centered view of evolution that changed how we talk about life."],
  ["Clean Code","Robert C. Martin","T",4.5,"Practical rules for writing code that other people can read and maintain."],
  ["The Pragmatic Programmer","Andrew Hunt & David Thomas","T",4.7,"Timeless habits and tips for becoming a better software craftsperson."],
  ["Introduction to Algorithms","Thomas H. Cormen","T",4.6,"A comprehensive reference on algorithms, data structures and analysis."],
  ["The Innovators","Walter Isaacson","T",4.4,"The people and collaborations behind the digital revolution."],
  ["Thinking, Fast and Slow","Daniel Kahneman","E",4.6,"How two systems of thought shape our judgments and decisions."],
  ["Mindset","Carol S. Dweck","E",4.5,"Why believing you can grow changes how you learn and achieve."],
  ["Emotional Intelligence","Daniel Goleman","E",4.3,"Why awareness of emotions matters as much as IQ for success."],
  ["The Power of Habit","Charles Duhigg","E",4.5,"The science of how habits form and how they can be changed."],
  ["The Psychology of Money","Morgan Housel","B",4.7,"Short stories on how behavior shapes financial outcomes more than math."],
  ["Start with Why","Simon Sinek","B",4.3,"Great leaders and organizations begin with purpose before products."],
  ["Rich Dad Poor Dad","Robert T. Kiyosaki","B",4.1,"A popular personal-finance book on assets, liabilities and mindset."],
  ["Think and Grow Rich","Napoleon Hill","B",4.2,"A classic on goals, persistence and the mindset of achievement."],
  ["The Lean Startup","Eric Ries","B",4.4,"Build, measure and learn: a practical method for testing new ideas."],
  ["Atomic Habits","James Clear","D",4.8,"Tiny changes that compound into remarkable results over time."],
  ["Deep Work","Cal Newport","D",4.5,"How to focus without distraction in a world that constantly pulls at you."],
  ["The 7 Habits of Highly Effective People","Stephen R. Covey","D",4.5,"Seven principles for personal and professional effectiveness."],
  ["How to Win Friends and Influence People","Dale Carnegie","D",4.5,"Timeless advice on communication and building genuine relationships."],
  ["Filosofi Teras","Henry Manampiring","D",4.6,"An accessible introduction to Stoicism for everyday Indonesian life."],
  ["Sapiens","Yuval Noah Harari","H",4.7,"A brief history of humankind, from early foragers to the modern age."],
  ["Homo Deus","Yuval Noah Harari","H",4.4,"A look ahead at how technology and data may reshape humanity."],
  ["Steve Jobs","Walter Isaacson","H",4.5,"An authorized biography of the co-founder of Apple."],
  ["Long Walk to Freedom","Nelson Mandela","H",4.7,"The autobiography of Nelson Mandela and the struggle against apartheid."],
  ["The Diary of a Young Girl","Anne Frank","H",4.8,"A young girl's diary written while hiding during World War II."],
  ["A People's History of the United States","Howard Zinn","H",4.3,"American history told from the perspective of ordinary people."]
];
/* Fictional titles are labeled with "(Fictional)" — add them here if you want more than 51 books. */

const BOOKS = RAW.map((b, i) => ({
  id: i + 1, title: b[0], author: b[1], category: CATEGORIES[b[2]].name,
  key: b[2], rating: b[3], desc: b[4], colors: CATEGORIES[b[2]].c
}));

const PAGE = 12;
const $ = (id) => document.getElementById(id);
const store = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
let saved = store.get("lumi-saved"), favs = store.get("lumi-favs");
let state = { q: "", cat: "all", sort: "title", shown: PAGE, tab: "saved", open: null };

/* ---------- Helpers ---------- */
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const stars = (r) => `<span class="stars">${"★".repeat(Math.round(r))}${"☆".repeat(5 - Math.round(r))}<span>${r.toFixed(1)}</span></span>`;
const cover = (b, big) => `<div class="cover${big ? " big" : ""}" data-id="${b.id}" style="--c1:${b.colors[0]};--c2:${b.colors[1]}"><b>${esc(b.title)}</b><small>${esc(b.author)}</small></div>`;
function toast(msg) {
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Cards ---------- */
function card(b) {
  const f = favs.includes(b.id);
  return `<article class="card">
    <button class="fav" data-fav="${b.id}" aria-label="Toggle favorite">${f ? "♥" : "♡"}</button>
    ${cover(b)}<span class="tag">${b.category}</span>
    <h4>${esc(b.title)}</h4><p class="by">${esc(b.author)}</p>${stars(b.rating)}
    <button class="btn btn-ghost btn-sm" data-view="${b.id}">View Book</button></article>`;
}

/* ---------- Books: search, filter, sort, load more ---------- */
function filtered() {
  const q = state.q.trim().toLowerCase();
  return BOOKS.filter((b) => (state.cat === "all" || b.category === state.cat) &&
    (!q || [b.title, b.author, b.category].some((s) => s.toLowerCase().includes(q))))
    .sort((a, b) => state.sort === "rating" ? b.rating - a.rating || a.title.localeCompare(b.title) : a.title.localeCompare(b.title));
}
function renderBooks() {
  const list = filtered();
  $("bookGrid").innerHTML = list.slice(0, state.shown).map(card).join("");
  $("noBooks").hidden = list.length > 0;
  $("loadMore").hidden = state.shown >= list.length;
  $("resultInfo").textContent = `Showing ${Math.min(state.shown, list.length)} of ${list.length} books`;
}
function resetAndRender() { state.shown = PAGE; renderBooks(); }

/* ---------- Categories ---------- */
function renderCategories() {
  const names = Object.values(CATEGORIES).map((c) => c.name);
  const count = (n) => BOOKS.filter((b) => b.category === n).length; // counted from real data
  $("catGrid").innerHTML = Object.values(CATEGORIES).map((c) =>
    `<button class="cat" data-cat="${c.name}"><div class="ic">${c.icon}</div><div><strong>${c.name}</strong><span>${count(c.name)} books</span></div></button>`).join("");
  $("catFilter").innerHTML = `<option value="all">All categories</option>` + names.map((n) => `<option>${n}</option>`).join("");
  $("footCats").innerHTML = names.slice(0, 6).map((n) => `<a href="#categories" data-cat="${n}">${n}</a>`).join("");
  $("stBooks").textContent = BOOKS.length; $("stCats").textContent = names.length;
}
function pickCategory(name) {
  state.cat = name; state.q = ""; $("search").value = ""; $("catFilter").value = name;
  resetAndRender(); $("books").scrollIntoView();
}

/* ---------- My Library ---------- */
function renderLibrary() {
  const ids = state.tab === "saved" ? saved : favs;
  const items = ids.map((id) => BOOKS.find((b) => b.id === id)).filter(Boolean);
  $("libGrid").innerHTML = items.map((b) => card(b) + "").join("");
  $("libEmpty").hidden = items.length > 0;
  $("emptyTitle").textContent = state.tab === "saved" ? "Your shelf is empty" : "No favorites yet";
  $("libCount").textContent = saved.length;
}
function toggleSave(id) {
  const b = BOOKS.find((x) => x.id === id);
  if (saved.includes(id)) { saved = saved.filter((x) => x !== id); toast(`Removed “${b.title}” from My Library`); }
  else { saved.push(id); toast(`Added “${b.title}” to My Library`); }
  store.set("lumi-saved", saved); refreshAll();
}
function toggleFav(id) {
  const b = BOOKS.find((x) => x.id === id);
  if (favs.includes(id)) { favs = favs.filter((x) => x !== id); toast(`Removed “${b.title}” from favorites`); }
  else { favs.push(id); toast(`Added “${b.title}” to favorites`); }
  store.set("lumi-favs", favs); refreshAll();
}
function refreshAll() { renderBooks(); renderFeatured(); renderLibrary(); if (state.open) updateModalBtn(); }

/* ---------- Featured & hero ---------- */
function renderFeatured() { $("featuredGrid").innerHTML = [6, 41, 50, 13, 25, 18].map((id) => card(BOOKS[id - 1])).join(""); }
function renderHero() { $("heroShelf").innerHTML = [6, 41, 15].map((id) => cover(BOOKS[id - 1])).join(""); }

/* ---------- Modals ---------- */
function openModal(id) { $(id).hidden = false; document.body.style.overflow = "hidden"; }
function closeModals() { document.querySelectorAll(".modal").forEach((m) => (m.hidden = true)); document.body.style.overflow = ""; state.open = null; }
function updateModalBtn() { $("mAdd").textContent = saved.includes(state.open) ? "Remove from My Library" : "Add to My Library"; }
function openBook(id) {
  const b = BOOKS.find((x) => x.id === id); state.open = id;
  $("mCover").innerHTML = cover(b, true); $("mCat").textContent = b.category;
  $("mTitle").textContent = b.title; $("mAuthor").textContent = "by " + b.author;
  $("mRating").innerHTML = stars(b.rating); $("mDesc").textContent = b.desc;
  $("reader").hidden = true; updateModalBtn(); openModal("bookModal");
}
function readBook() {
  const b = BOOKS.find((x) => x.id === state.open), r = $("reader");
  r.innerHTML = `<strong>Demo preview — ${esc(b.title)}</strong><p>This is sample text for demonstration. Lumi Library does not provide full texts of copyrighted books. Only the book information and description are shown here.</p><p>In a real product, this area would open a licensed or public-domain edition supplied by the publisher.</p>`;
  r.hidden = false; r.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- Events (one delegated listener for clicks) ---------- */
document.addEventListener("click", (e) => {
  const t = e.target;
  const view = t.closest("[data-view]"), fav = t.closest("[data-fav]"), cat = t.closest("[data-cat]");
  if (view) return openBook(+view.dataset.view);
  if (fav) return toggleFav(+fav.dataset.fav);
  if (cat) { if (cat.tagName === "A") e.preventDefault(); return pickCategory(cat.dataset.cat); }
  if (t.matches("[data-close]") || t.classList.contains("modal")) closeModals();
  if (t.closest(".menu a")) $("menu").classList.remove("open");
  const tab = t.closest("[data-tab]");
  if (tab) { state.tab = tab.dataset.tab; document.querySelectorAll(".tab").forEach((x) => x.classList.toggle("on", x === tab)); renderLibrary(); }
});
$("search").addEventListener("input", (e) => { state.q = e.target.value; state.cat = "all"; $("catFilter").value = "all"; resetAndRender(); });
$("catFilter").addEventListener("change", (e) => { state.cat = e.target.value; resetAndRender(); });
$("sort").addEventListener("change", (e) => { state.sort = e.target.value; resetAndRender(); });
$("loadMore").addEventListener("click", () => { state.shown += PAGE; renderBooks(); });
$("viewAllBtn").addEventListener("click", () => { state.cat = "all"; state.q = ""; $("catFilter").value = "all"; $("search").value = ""; resetAndRender(); });
$("exploreBtn").addEventListener("click", () => resetAndRender());
$("searchBtn").addEventListener("click", () => { $("books").scrollIntoView(); setTimeout(() => $("search").focus(), 400); });
$("burger").addEventListener("click", () => $("menu").classList.toggle("open"));
$("signBtn").addEventListener("click", () => openModal("signModal"));
$("mAdd").addEventListener("click", () => toggleSave(state.open));
$("mRead").addEventListener("click", readBook);
$("signSubmit").addEventListener("click", () => {
  if (!$("email").value.includes("@") || $("pass").value.length < 4) return toast("Enter a valid email and password");
  closeModals(); toast("Demo sign-in only. No real account was created.");
});
document.addEventListener("keydown", (e) => e.key === "Escape" && closeModals());

/* Highlight the current section in the navbar */
const links = [...document.querySelectorAll(".menu a")];
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
["home", "books", "categories", "library", "about"].forEach((id) => io.observe($(id)));

/* ---------- Init ---------- */
$("year").textContent = new Date().getFullYear();
renderCategories(); renderHero(); renderFeatured(); renderBooks(); renderLibrary();

/* ---------- Real covers (Open Library) ----------
   Looks up each book by title + author, caches the result in localStorage,
   and swaps the CSS cover for the real image. If anything fails, the CSS cover stays. */
let coverCache = {};
try { coverCache = JSON.parse(localStorage.getItem("lumi-covers")) || {}; } catch {}
const pending = {};
function findCover(b) {
  if (b.id in coverCache) return Promise.resolve(coverCache[b.id]);
  if (pending[b.id]) return pending[b.id];
  const url = `https://openlibrary.org/search.json?limit=1&fields=cover_i&title=${encodeURIComponent(b.title)}&author=${encodeURIComponent(b.author.split("&")[0].trim())}`;
  return (pending[b.id] = fetch(url).then((r) => r.json()).then((d) => {
    const id = d.docs && d.docs[0] && d.docs[0].cover_i;
    coverCache[b.id] = id ? `https://covers.openlibrary.org/b/id/${id}-L.jpg?default=false` : 0;
    try { localStorage.setItem("lumi-covers", JSON.stringify(coverCache)); } catch {}
    return coverCache[b.id];
  }).catch(() => 0));
}
function applyCovers() {
  document.querySelectorAll(".cover[data-id]:not([data-done])").forEach((el) => {
    el.dataset.done = "1";
    const b = BOOKS.find((x) => x.id === +el.dataset.id);
    findCover(b).then((src) => {
      if (!src) return;
      const img = new Image(); img.alt = b.title + " cover"; img.loading = "lazy";
      img.onload = () => { if (img.naturalWidth > 10) { el.classList.add("has-img"); el.prepend(img); } };
      img.src = src; /* on error nothing happens: the CSS cover remains */
    });
  });
}
new MutationObserver(applyCovers).observe(document.body, { childList: true, subtree: true });
applyCovers();