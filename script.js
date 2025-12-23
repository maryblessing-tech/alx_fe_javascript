// Quotes array
let quotes = [
  { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" }
];

// Load quotes from localStorage
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
  populateCategories();
}

// Display a random quote (filtered if category selected)
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const filter = document.getElementById("categoryFilter").value;
  const filteredQuotes = filter === "all" ? quotes : quotes.filter(q => q.category === filter);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
}

// Add new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();
  if (newText === "" || newCategory === "") return;

  quotes.push({ text: newText, category: newCategory });
  textInput.value = "";
  categoryInput.value = "";
  saveQuotes();
  displayRandomQuote();
}

// Populate category dropdown
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const selected = select.value;
  select.innerHTML = '<option value="all">All Categories</option>';
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
  select.value = selected || "all";
}

// Filter quotes when category changes
function filterQuotes() {
  displayRandomQuote();
  localStorage.setItem("lastCategory", document.getElementById("categoryFilter").value);
}

// JSON Export
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// JSON Import
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    displayRandomQuote();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load last selected category
document.addEventListener("DOMContentLoaded", () => {
  const lastCat = localStorage.getItem("lastCategory") || "all";
  populateCategories();
  document.getElementById("categoryFilter").value = lastCat;
  displayRandomQuote();
});

// Event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("exportBtn").addEventListener("click", exportToJson);
