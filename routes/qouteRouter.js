import express from 'express';
import { quotes } from '../data.js';
import { getRandomElement } from '../utils.js';

const quoteRouter = express.Router();


// GET : Randomized Quote
quoteRouter.get('/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.status(200).json({
    quote: randomQuote
  });
});


// GET : All Quotes or Based on Author
quoteRouter.get('/', (req, res, next) =>{
  if (!req.query.person) {
    res.status(200).json({
      quotes: quotes
    });
  } else {
    const quotesByAuthor = quotes.filter((quote) => quote.person === req.query.person);

      if (quotesByAuthor.length > 0) {
        res.status(200).json({
          quotes: quotesByAuthor
          });
      } else {  
        res.status(200).json({
          quotes: []
          });
      }
  } 
});


// POST : Create New Quote
quoteRouter.post('/', (req, res, next) => {
  if (req.query.quote && req.query.person) {
    
    const newQuote = {
      quote: req.query.quote,
      person: req.query.person,
      year: req.query.year || 'Unknown'
    };
    quotes.push(newQuote);
    res.status(201).json({
      quote: newQuote
    });
    
  } else {res.status(400).send();
  }
});

// PUT : Update Quote in the data
quoteRouter.put('/:id', (req, res, next) => {
  const index = req.params.id - 1;

  if (index >= 0 && index < quotes.length) {
    const updatedQuote = {
      quote: req.query.quote || quotes[index].quote,
      person: req.query.person || quotes[index].person,
      year: req.query.year || quotes[index].year
    };
    quotes[index] = updatedQuote;
    res.status(200).json({
      quote: updatedQuote
    });
  } else {
    res.status(404).send();
  }
  
});

// DELETE : Remove Quote from the data
quoteRouter.delete('/:id', (req, res, next) => {
  const index = req.params.id - 1;

  if (index >= 0 && index < quotes.length) {
    quotes.splice(index, 1);
    res.status(205).send();
  } else {
    res.status(404).send();
  }
  
});


export default quoteRouter;