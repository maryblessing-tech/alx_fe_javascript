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
  quoteDisplay.innerHTML = ""; // clear previous quote

  let randomIndex = Math.floor(Math.random() * quotes.length);
  let quoteObj = quotes[randomIndex];

  // Create new DOM element for quote
  let quoteElement = document.createElement("p");
  quoteElement.textContent = `${quoteObj.text} (${quoteObj.category})`;

  // Append to quoteDisplay
  quoteDisplay.appendChild(quoteElement);
}

// Function to add a new quote
function addQuote(quoteText, quoteCategory) {
  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields");
    return;
  }

  // Add new quote to array
  quotes.push({ text: quoteText, category: quoteCategory });

  // Create new DOM element for the new quote
  let newQuoteElement = document.createElement("p");
  newQuoteElement.textContent = `${quoteText} (${quoteCategory})`;
  quoteDisplay.appendChild(newQuoteElement);
}

// Function to create the add quote form
function createAddQuoteForm() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const addBtn = document.getElementById("addQuoteBtn");

  addBtn.addEventListener("click", function () {
    addQuote(quoteInput.value, categoryInput.value);
    quoteInput.value = "";
    categoryInput.value = "";
  });

  // Event listener for "Show New Quote" button
  newQuoteBtn.addEventListener("click", showRandomQuote);
}

// Initialize
showRandomQuote();
createAddQuoteForm();
