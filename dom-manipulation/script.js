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

// Load quotes and last selected category from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }

  const storedFilter = localStorage.getItem("selectedCategory");
  if (storedFilter) {
    categoryFilter.value = storedFilter;
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate categories dynamically in the dropdown
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  
  // Remove existing options except 'All Categories'
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore selected category if previously stored
  const storedFilter = localStorage.getItem("selectedCategory");
  if (storedFilter) categoryFilter.value = storedFilter;
}

// Display quotes based on selected category
function showQuotesByCategory() {
  quoteDisplay.innerHTML = "";
  const selectedCategory = categoryFilter.value;

  // Save selected filter
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  filteredQuotes.forEach(quoteObj => {
    const quoteElement = document.createElement("p");
    quoteElement.textContent = `${quoteObj.text} (${quoteObj.category})`;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Add a new quote
function addQuote(quoteText, quoteCategory) {
  if (!quoteText || !quoteCategory) {
    alert("Please fill in both fields");
    return;
  }

  let newQuoteObj = { text: quoteText, category: quoteCategory };
  quotes.push(newQuoteObj);
  saveQuotes();
  populateCategories(); // Update dropdown with new category
  showQuotesByCategory(); // Display filtered list
}

// Event listener setup
function createAddQuoteForm() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const addBtn = document.getElementById("addQuoteBtn");

  addBtn.addEventListener("click", function () {
    addQuote(quoteInput.value, categoryInput.value);
    quoteInput.value = "";
    categoryInput.value = "";
  });

  newQuoteBtn.addEventListener("click", showQuotesByCategory);
  categoryFilter.addEventListener("change", showQuotesByCategory);
}

// Initialize
loadQuotes();
populateCategories();
showQuotesByCategory();
createAddQuoteForm();
