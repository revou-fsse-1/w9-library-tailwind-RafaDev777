function getPageFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let page = urlParams.get("page");

  return page;
}

async function getBooksData() {
  let response = await fetch("./data.json");
  let json = await response.json();
  return json["books"];
}

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

let searchForm = document.querySelector(".search-form");
let searchInput = document.querySelector(".search-input");
let searchResult = document.querySelector("search-result");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //setup the string
  let query = searchInput.value.trim().toLowerCase();

  //get the data
  const booksData = await getBooksData();

  //search the data.json with filter
  const result = booksData.filter(({ title }) =>
    title.toLowerCase().includes(query)
  );

  //   searchResult.innerHTML = "";

  result.forEach((book) => {
    let resultCard = document.createElement("a");
    resultCard.classList.add("search-result-card", "my-6");
    resultCard.innerHTML = `
        <img
        class="search-result-img"
        src="${book.image}"
        alt="${book.title}"
      />
      <div class="search-result-descr">
        <h3 class="search-result-title">${book.title}</h3>
        <b>Author(s):${book.authors.join(",")}</b>
        <caption>${book.subjects.join(",")}</caption>
      </div>`;
    searchResult.appendChild(resultCard);
  });
});
