// QUOTES ELEMENT
const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');

const quoteContainer = document.getElementById('quote-container');
//const quoteText = document.querySelector('.quote');
//const attributionText = document.querySelector('.attribution');

// BIODATA ELEMENT 
const allBiodata = document.getElementById('all-biodata');
const randomBiodata = document.getElementById('randomized-biodata');
const biodataByAuthor = document.getElementById('biodata-by-author');
const biodataContainer = document.getElementById('biodata-container');



// ---- QUOTES FUNCTIONS ----
// Reset the quote container to have no quotes displayed
const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

// Error handling function
const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
};


// Render the quotes in the quote container
const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    // Loop through the quotes and create a new div for each quote
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      // Set the class name for styling
      newQuote.className = 'single-quote'; //padding 10px
      // in css, .quote-text is italic
      newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person} -- <i>stated in ${quote.year}</i></div>`;

      // Append the new quote div to the quote container
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}


// Fetch all quotes function - GET /api/quotes
fetchAllButton.addEventListener('click', () => {
  fetch('/api/quotes') // pass to quoteRouter.js, which returns all quotes
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes); // because the res.json is {quotes: quotes} OR {quotes: quotesByAuthor}
  });
});

// Fetch random quote function - GET /api/quotes/random
fetchRandomButton.addEventListener('click', () => {
  fetch('/api/quotes/random') // pass to quoteRouter.js, which returns a random quote
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response.quote]); // res.json is {quote: randomQuote}
  });
});


// Fetch quotes by author function - GET /api/quotes?person=author
fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value; // from the input field with id="author"
  fetch(`/api/quotes?person=${author}`) // pass to quoteRouter.js, which returns quotes by author
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});


// ---- BIODATA FUNCTIONS ----

const resetBiodata = () => {
  biodataContainer.innerHTML = '';
}

const renderBiodataError = response => {
  biodataContainer.innerHTML = `<p>There was an error with your request. Status code: ${response.status}</p>, with status text: ${response.statusText}`;
};

const renderBiodata = (biodatas = []) => {
  resetBiodata();
  if (biodatas.length > 0) {
    biodatas.forEach(biodata => {
        const newBiodata = document.createElement('div');
        newBiodata.className = 'single-biodata';
        newBiodata.innerHTML = `
            <h3>${biodata.person} <span>(b. ${biodata.born})</span></h3>
            <div class="biodata-text"><strong>Notable Work:</strong> ${biodata.knownFor}</div>
            <div class="attribution"><em>${biodata.blurb}</em></div>
        `;
        biodataContainer.appendChild(newBiodata);
    });
  } else {
    biodataContainer.innerHTML = '<p>Your request returned no biodatas.</p>';
  }
};

allBiodata.addEventListener('click', () => {
    fetch('/api/biodata')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            renderBiodataError(response);
        }
    })
    .then(response => {
        renderBiodata(response.biodatas);
    });
});


randomBiodata.addEventListener('click', () => {
    fetch('/api/biodata/random?t=' + Date.now()) // Adding a timestamp to prevent caching
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            renderBiodataError(response);
        }
    })
    .then(response => {
        renderBiodata([response.biodata]);
    });
});

biodataByAuthor.addEventListener('click', () => {
    const biodataAuthor = document.getElementById('biodata-author').value;
    fetch(`/api/biodata?person=${biodataAuthor}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            renderBiodataError(response);
        }
    })
    .then(response => {
        renderBiodata(response.biodatas);
    });
});