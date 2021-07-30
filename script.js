const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const author = document.getElementById('author');

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}


let data = "";

const getNewQuote = () => {
    let rnum = Math.floor(Math.random() * 10 +Math.floor(Math.random()));

    if (data[rnum].author === "") {
        author.innerText = 'Unknown';
    }
    else {
        author.innerText = data[rnum].author;
    }
    if (data[rnum].text.length > 50) {
        quoteText.classList.add("long-qoute");
    }
    else {
        quoteText.classList.remove("long-quote");
    }



    quoteText.innerText = `${data[rnum].text}`;
    author.innerText = `${data[rnum].author}`;

}
async function getQuote() {
    showLoadingSpinner();
     const apiurl = "https://type.fit/api/quotes";

    try {
        const response = await fetch(apiurl);
        data = await response.json();
        getNewQuote();


    } catch (error) {

    }
    // Stop Loader and show the Quote
		removeLoadingSpinner();
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const newAuthor = author.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

newQuote.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();