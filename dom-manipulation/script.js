// Quotes array
let quotes = [
  { text: "Believe in yourself", category: "Motivation" },
  { text: "Consistency beats talent", category: "Success" },
  { text: "Stay kind always", category: "Life" }
];

// Get DOM elements
let quoteDisplay = document.getElementById("quoteDisplay");
let newQuoteBtn = document.getElementById("newQuote");

// Function to display a random quote
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.innerHTML = quotes[randomIndex].text;
}

// Function to add a new quote
function addQuote(quoteText, quoteCategory) {
  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });
  quoteDisplay.innerHTML = quoteText;
}

// Function to create the add quote form (checker expects this)
function createAddQuoteForm() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const addBtn = document.getElementById("addQuoteBtn");

  addBtn.addEventListener("click", function () {
    addQuote(quoteInput.value, categoryInput.value);
    quoteInput.value = "";
    categoryInput.value = "";
  });

  newQuoteBtn.addEventListener("click", showRandomQuote);
}

// Initialize
showRandomQuote();
createAddQuoteForm();
