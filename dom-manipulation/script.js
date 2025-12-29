// Quotes array
let quotes = [
  { text: "Believe in yourself", category: "Motivation" },
  { text: "Consistency beats talent", category: "Success" },
  { text: "Stay kind always", category: "Life" }
];

// Get DOM elements
let quoteDisplay = document.getElementById("quoteDisplay");
let newQuoteBtn = document.getElementById("newQuote");
let addQuoteBtn = document.getElementById("addQuoteBtn");

// Function to display a random quote
function displayRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.innerHTML = quotes[randomIndex].text;
}

// Event listener for Show New Quote button
newQuoteBtn.addEventListener("click", displayRandomQuote);

// Function to add a new quote
function addQuote() {
  let quoteText = document.getElementById("newQuoteText").value;
  let quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });
  quoteDisplay.innerHTML = quoteText;

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Event listener for Add Quote button
addQuoteBtn.addEventListener("click", addQuote);

// Display a random quote when page loads
displayRandomQuote();
