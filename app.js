const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// For read the quotes.json file

const quotesFilePath = path.join(__dirname, 'quotes.json');
const quotes = JSON.parse(fs.readFileSync(quotesFilePath, 'utf-8'));


// Test 

// app.get('/', (req, res) => {
//  res.send('Welcome to Quotes API');
//   const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//   res.json(randomQuote);
//   const html = `
//   <html>
//     <head>
//         <title>Quotes of the Day</title>
//     </head>
//     <body style="background-color: #f0f0f0;">
//     <h1>Quotes of the Day</h1>
//     <p>${randomQuote.quote}</p>
//     <p>By: ${randomQuote.author}</p>
//     </body>
//     </html>
//     `;
//     res.send(html);
// });

// 
app.get('/random-quote', async (req, res) => {
    try {
      const response = await axios.get('https://zenquotes.io/api/random');
      const quote = response.data[0];
      res.json({ text: quote.q, author: quote.a });
    } catch (error) {
      console.error('Error fetching quote:', error.message);
      res.status(500).json({ error: 'Failed to fetch quote' });
    }
  });

  app.get('/quotes', (req, res) => {
    let filteredQuotes = quotes;
    const author = req.query.author;
    if (author) {
        filteredQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (filteredQuotes.length === 0) {
        return res.status(404).json({ error: 'No quotes found for the provided author' });
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    res.json({ text: randomQuote.quote, author: randomQuote.author });
});
// routes to serve the json file
app.get('/api', (req, res) => {
  res.json(quotes);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



