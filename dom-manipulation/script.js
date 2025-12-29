// Quotes array
let quotes = [
  { text: "Believe in yourself", category: "Motivation" },
  { text: "Consistency beats talent", category: "Success" },
  { text: "Stay kind always", category: "Life" }
];

// DOM elements
let quoteDisplay = document.getElementById("quoteDisplay");
let newQuoteBtn = document.getElementById("newQuote");

// Load quotes from localStorage if available
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  quoteDisplay.innerHTML = "";
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let quoteObj = quotes[randomIndex];

  // Optional: save last viewed quote in sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(quoteObj));

  let quoteElement = document.createElement("p");
  quoteElement.textContent = `${quoteObj.text} (${quoteObj.category})`;
  quoteDisplay.appendChild(quoteElement);
}

// Add a new quote
function addQuote(quoteText, quoteCategory) {
  if (!quoteText || !quoteCategory) {
    alert("Please fill in both fields");
    return;
  }

  let newQuoteObj = { text: quoteText, category: quoteCategory };
  quotes.push(newQuoteObj);
  saveQuotes(); // persist to localStorage
  showRandomQuote();
}

// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      showRandomQuote();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Setup add quote form and event listeners
function createAddQuoteForm() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const addBtn = document.getElementById("addQuoteBtn");
  const exportBtn = document.getElementById("exportBtn");
  const importFile = document.getElementById("importFile");

  addBtn.addEventListener("click", function () {
    addQuote(quoteInput.value, categoryInput.value);
    quoteInput.value = "";
    categoryInput.value = "";
  });

  newQuoteBtn.addEventListener("click", showRandomQuote);
  exportBtn.addEventListener("click", exportToJsonFile);
  importFile.addEventListener("change", importFromJsonFile);
}

// Initialize
loadQuotes();
showRandomQuote();
createAddQuoteForm();
