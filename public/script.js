// public/script.js
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const searchForm = document.getElementById('searchForm');
const authorSearch = document.getElementById('authorSearch');
// const getQuoteBtn = document.getElementById('getQuoteBtn');

const fetchQuote = async (author) => {
    let url = '/quotes';
    if (author) {
        url += `?author=${author}`;
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        quoteText.textContent = ` "${data.text}" `;
        quoteAuthor.textContent = `- ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error.message);
        quoteText.textContent = 'Failed to fetch quote.';
        quoteAuthor.textContent = '';
    }
};
window.addEventListener('DOMContentLoaded', () => {
    fetchQuote('');
});

// Fetch a new quote every 24 hr
setInterval(fetchQuote, 8.64e+7); 
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = authorSearch.value.trim();
    fetchQuote(author);
});