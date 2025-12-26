const API_KEY = "f13d525a";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesDiv = document.getElementById("movies");
const toggleDark = document.getElementById("toggleDark");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

/* Dark Mode */
toggleDark.onclick = () => document.body.classList.toggle("dark");

/* Search */
searchBtn.onclick = searchMovies;
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchMovies();
});

function searchMovies() {
  const q = searchInput.value.trim();
  if (q.length >= 3) fetchMovies(q);
}

/* Fetch */
async function fetchMovies(query) {
  moviesDiv.innerHTML = "<p>Loading...</p>";

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
  );
  const data = await res.json();

  if (data.Search) renderMovies(data.Search);
  else moviesDiv.innerHTML = "<p>No results found</p>";
}

/* Render */
function renderMovies(movies) {
  moviesDiv.innerHTML = "";

  movies.forEach(m => {
    const div = document.createElement("div");
    div.className = "movie";

    div.innerHTML = `
      <span class="favorite">❤️</span>
      <img src="${m.Poster !== "N/A" ? m.Poster : ""}">
      <h3>${m.Title}</h3>
      <p>${m.Year}</p>
    `;

    div.onclick = () => showDetails(m.imdbID);
    moviesDiv.appendChild(div);
  });
}

/* DETAILS MODAL */
async function showDetails(id) {
  modal.classList.remove("hidden");

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
  );
  const m = await res.json();

  modalBody.innerHTML = `
    <h2>${m.Title}</h2>
    <p><strong>⭐ Rating:</strong> ${m.imdbRating}</p>
    <p><strong>Genre:</strong> ${m.Genre}</p>
    <p><strong>Plot:</strong> ${m.Plot}</p>
  `;
}

closeModal.onclick = () => modal.classList.add("hidden");
