// Quotes array
let quotes = [
  { text: "Believe in yourself", category: "Motivation" },
  { text: "Consistency beats talent", category: "Success" },
  { text: "Stay kind always", category: "Life" }
];

// DOM elements
let quoteDisplay = document.getElementById("quoteDisplay");
let newQuoteBtn = document.getElementById("newQuote");
let categoryFilter = document.getElementById("categoryFilter");

// Load quotes and last selected category
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) quotes = JSON.parse(storedQuotes);

  const storedFilter = localStorage.getItem("selectedCategory");
  if (storedFilter) categoryFilter.value = storedFilter;
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate categories dynamically
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter
  const storedFilter = localStorage.getItem("selectedCategory");
  if (storedFilter) categoryFilter.value = storedFilter;
}

// Filter quotes and show a random one
function filterQuote() {
  quoteDisplay.innerHTML = "";

  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory); // save filter

  // Filter quotes
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No quotes found in this category.";
    quoteDisplay.appendChild(msg);
    return;
  }

  // Pick a random quote from filtered list
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quoteObj = filteredQuotes[randomIndex];

  // Save last viewed quote in sessionStorage (optional)
  sessionStorage.setItem("lastQuote", JSON.stringify(quoteObj));

  const quoteElement = document.createElement("p");
  quoteElement.textContent = `${quoteObj.text} (${quoteObj.category})`;
  quoteDisplay.appendChild(quoteElement);
}

// Add a new quote
function addQuote(quoteText, quoteCategory) {
  if (!quoteText || !quoteCategory) {
    alert("Please fill in both fields");
    return;
  }

  const newQuoteObj = { text: quoteText, category: quoteCategory };
  quotes.push(newQuoteObj);
  saveQuotes();
  populateCategories();
  filterQuote(); // show a random quote in the selected category
}

// Export quotes to JSON
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

// Import quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      filterQuote();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Setup event listeners
function setupEventListeners() {
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

  newQuoteBtn.addEventListener("click", filterQuote);
  categoryFilter.addEventListener("change", filterQuote);
  exportBtn.addEventListener("click", exportToJsonFile);
  importFile.addEventListener("change", importFromJsonFile);
}

// Initialize the app
loadQuotes();
populateCategories();
filterQuote();
setupEventListeners();
