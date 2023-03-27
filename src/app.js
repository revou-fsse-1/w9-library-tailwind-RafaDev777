/* MOBILE MENU fUNC ------------------------*/
const toggleMobileMenu = () => {
  let mMenuBtn = document.querySelector(".m-menu-btn");
  let mMenuContainer = document.querySelector(".m-menu-container");
  let stripe1 = document.querySelector(".stripe-1");
  let stripe2 = document.querySelector(".stripe-2");
  let stripe3 = document.querySelector(".stripe-3");
  let isOpen = document.querySelector(".m-menu-btn").classList.contains("open");
  mMenuBtn.classList.toggle("open");

  mMenuContainer.classList.toggle("block");
  mMenuContainer.classList.toggle("hidden");

  if (!isOpen) {
    //to open
    stripe1.style.transform = "rotate(45deg)";
    stripe1.style.transition = "transform 1s";
    stripe2.style.opacity = "0";
    stripe3.style.transform = "rotate(-45deg)";
    stripe3.style.transition = "transform 1s";
  } else {
    //to close
    stripe1.style.transform = "rotate(0deg)";
    stripe2.style.opacity = "1";
    stripe3.style.transform = "rotate(0deg)";
  }
};

/* SEARCH FUNC ----------------*/

const getBooksData = async () => {
  let response = await fetch("./src/data.json");
  let json = await response.json();
  return json["books"];
};

let searchForm = document.querySelector(".search-form");
let searchResult = document.querySelector(".search-result");

const searchBooks = async (evt) => {
  evt.preventDefault();
  const books = await getBooksData();
  const value = document.querySelector(".search-input").value.toLowerCase();

  if (value.length > 0) {
    searchResult.innerHTML = "";
    searchResult.classList.remove("hidden");

    let filteredBooks = books.filter(
      (book) =>
        book["title"].toLowerCase().includes(value) ||
        book["authors"].join(", ").toLowerCase().includes(value) ||
        book["subjects"].join(", ").toLowerCase().includes(value)
    );
    if (filteredBooks.length > 0) {
      filteredBooks.forEach((book) => {
        let resultCard = document.createElement("a");
        resultCard.className = "search-result-card my-6";
        resultCard.href = "#";
        resultCard.innerHTML = `
              <img
              class="search-result-img"
              src="${book.image}"
              alt="${book.title}"
            />
            <div class="search-result-descr">
              <h3 class="search-result-title">${book.title}</h3>
              <strong>Author(s):${book.authors.join(",")}</strong>
              <caption>${book.subjects.join(",")}</caption>
            </div>`;
        searchResult.appendChild(resultCard);
      });
    } else {
      let resultNotFound = document.createElement("div");
      resultNotFound.className =
        "search-result-not-found text-center text-gray-400";
      resultNotFound.innerHTML = `<p class="search-form">No books found, please try with another keyword</p>`;
      searchResult.appendChild(resultNotFound);
    }
  }
};

const search = () => {
  searchForm.onsubmit = searchBooks;
};

/* PAGE TAB FUNCTION --------------------------*/

const bookGrid = document.querySelector(".book-grid");

const getPageFromUrl = () => {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let page = urlParams.get("page");
  return page;
};

const loadBooks = async () => {
  // let page = getPageFromUrl();

  let queryString = window.location.search;
  let page = new URLSearchParams(queryString).get("page");
  page = page ? Number(page) : 1;
  const books = await getBooksData();

  books.slice(12 * (page - 1), 12 * page).forEach((book) => {
    let bookShowCard = document.createElement("div");
    bookShowCard.className = "book-show-card";
    bookShowCard.innerHTML = `<a href="#">
  <img
    class="book-show-img"
    src="${book.image}"
    alt="${book.title}"
  />
  <div class="book-show-text-wrapper">
    <h3 class="book-show-title ">
    ${book.title}
    </h3>
    <p class="book-show-descr">
      <strong>Author(s):</strong> ${book.authors.join(", ")}
    </p>
  </div>
</a>`;
    bookGrid.appendChild(bookShowCard);
  });
};

function previousBooksPage() {
  //page = getPageFromURL
  let queryString = window.location.search;
  let page = new URLSearchParams(queryString).get("page");
  if (page && page == "2") {
    window.location.replace("?page=1");
  } else {
    window.location.reload();
  }
}

function nextBooksPage() {
  // page = getPageFromUrl
  let queryString = window.location.search;
  let page = new URLSearchParams(queryString).get("page");
  if (page && page == "1") {
    window.location.replace("?page=2");
  } else {
    window.location.reload();
  }
}
