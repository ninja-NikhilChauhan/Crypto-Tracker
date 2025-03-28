// API request options
const options = {
    method: 'GET',
    headers: { 
        accept: 'application/json', 
        'x-cg-demo-api-key': 'CG-mDVVqLm5xBDjvcVq523LnAmB' 
    },
};

// State variables
let coins = []; // Array to store coin data
let currentPage = 1; // Current page number for pagination

// Fetch coins from API (Class 2 functionality)
const fetchCoins = async (page = 1) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${page}`, options);
        coins = await response.json();
    } catch (err) {
        console.error(err);
    }
    return coins;
};

// Retrieve favorites from localStorage (for star icon display)
// const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];
//  ${isFavorite ? 'favorite' : ''}" data-id="${coin.id}"> // to toggle icon

// Render a single coin row (with favorite star icon)
const renderCoinRow = (coin, index, start) => {
    // const isFavorite = favorites.includes(coin.id);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${start + index}</td>
        <td><img src="${coin.image}" alt="${coin.name}" width="24" height="24" /></td>
        <td>${coin.name}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>$${coin.total_volume.toLocaleString()}</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td>
            <i class="fas fa-star favorite-icon" ></i>
        </td>
    `;
    return row;
};

// Render coins (Class 2 functionality)
const renderCoins = (coinsToDisplay, page, itemsPerPage) => {
    const start = (page - 1) * itemsPerPage + 1;
    // const favorites = getFavorites();
    const tableBody = document.querySelector('#crypto-table tbody');
    
    if (!tableBody) {
        console.error("Table body element not found!");
        return;
    }

    tableBody.innerHTML = ''; // Clear existing rows before rendering new data

    coinsToDisplay.forEach((coin, index) => {
        const row = renderCoinRow(coin, index, start);
        tableBody.appendChild(row);
    });
};

// Initialize the page (Class 2 functionality)
const initializePage = async () => {
    coins = await fetchCoins(currentPage);
    
    if (coins.length === 0) {
        console.error("No coins data fetched!");
        return;
    }

    renderCoins(coins, currentPage, 25);
};

// Event listener to load data on page load (Class 2 functionality)
document.addEventListener('DOMContentLoaded', initializePage);
