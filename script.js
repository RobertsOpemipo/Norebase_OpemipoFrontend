const apiUrl = "https://api.coinlore.net/api/tickers/";
let currentPage = 1;
const itemsPerPage = 10;

async function fetchCoins() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.data;
}

function displayCoins(coins) {
  const tableBody = document.querySelector("#coinTable tbody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedCoins = coins.slice(start, end);

  paginatedCoins.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td data-label="💰Coin">${coin.name}</td>
            <td data-label="📄Code">${coin.symbol}</td>
            <td data-label="🤑Price">$${coin.price_usd}</td>
            <td data-label="📉Total Supply">${coin.csupply}${coin.symbol}</td>
        `;
    tableBody.appendChild(row);
  });
}

function updatePagination(coins) {
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  prevBtn.style.display = currentPage === 1 ? "none" : "inline-block";
  nextBtn.style.display =
    currentPage * itemsPerPage >= coins.length ? "none" : "inline-block";
}

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCoins();
  }
});

document.getElementById("next").addEventListener("click", () => {
  currentPage++;
  loadCoins();
});

async function loadCoins() {
  const coins = await fetchCoins();
  displayCoins(coins);
  updatePagination(coins);
}


loadCoins();
