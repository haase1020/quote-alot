const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
// function loading() {
//   loader.hidden = false;
//   quoteContainer.hidden = true;
// }

// hide loading
// function complete() {
//   if (!loader.hidden) {
//     quoteContainer.hidden = false;
//     loader.hidden = true;
//   }
// }

// get quote from API
async function getQuote() {
  //   loading();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // default author to unknown if no author
    if (data.quoteAuthor === '') {
      authorText.innerText = 'unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // make font smaller for longer quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // stop loader, show quote
    // complete();
  } catch (error) {
    getQuote(); //due to API issues
  }
}

//twittter
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
// getQuote();
