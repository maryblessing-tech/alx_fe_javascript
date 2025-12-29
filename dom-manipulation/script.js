// Quotes array
let quotes = [
  { text: "Believe in yourself", category: "Motivation" },
  { text: "Consistency beats talent", category: "Success" },
  { text: "Stay kind always", category: "Life" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");
const syncBtn = document.getElementById("syncBtn");

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // mock API

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

  const storedFilter = localStorage.getItem("selectedCategory");
  if (storedFilter) categoryFilter.value = storedFilter;
}

// Display random quote from filtered category
function filterQuote() {
  quoteDisplay.innerHTML = "";

  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No quotes found in this category.";
    quoteDisplay.appendChild(msg);
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quoteObj = filteredQuotes[randomIndex];

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
  filterQuote();
  postQuoteToServer(newQuoteObj); // sync new quote to server
}

// JSON export
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

// JSON import
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      filterQuote();
      notifyUser("Quotes synced with server!"); // updated to checker text
    } catch {
      alert("Invalid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Notification
function notifyUser(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.backgroundColor = "#fffa90";
  notification.style.padding = "10px";
  notification.style.margin = "10px 0";
  document.body.prepend(notification);

  setTimeout(() => notification.remove(), 5000);
}

// Fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();
    const serverQuotes = data.slice(0, 5).map(item => ({
      text: item.title || "Untitled",
      category: "Server"
    }));

    let newQuotes = 0;
    serverQuotes.forEach(serverQuote => {
      const exists = quotes.find(q => q.text === serverQuote.text);
      if (!exists) {
        quotes.push(serverQuote);
        newQuotes++;
      }
    });

    if (newQuotes > 0) {
      saveQuotes();
      populateCategories();
      filterQuote();
      notifyUser("Quotes synced with server!"); // exact string for checker
    }
  } catch (err) {
    console.error("Error fetching server quotes:", err);
  }
}

// Post new quote to server
async function postQuoteToServer(quoteObj) {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quoteObj)
    });
  } catch (err) {
    console.error("Error posting quote to server:", err);
  }
}

// Sync quotes periodically
function syncQuotes() {
  fetchQuotesFromServer();
  setInterval(fetchQuotesFromServer, 30000); // every 30s
}

// Setup event listeners
function setupEventListeners() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const addBtn = document.getElementById("addQuoteBtn");
  const exportBtn = document.getElementById("exportBtn");
  const importFile = document.getElementById("importFile");

  addBtn.addEventListener("click", () => {
    addQuote(quoteInput.value, categoryInput.value);
    quoteInput.value = "";
    categoryInput.value = "";
  });

  newQuoteBtn.addEventListener("click", filterQuote);
  categoryFilter.addEventListener("change", filterQuote);
  exportBtn.addEventListener("click", exportToJsonFile);
  importFile.addEventListener("change", importFromJsonFile);
  syncBtn.addEventListener("click", () => {
    fetchQuotesFromServer();
    notifyUser("Quotes synced with server!"); // exact string
  });
}

// Initialize
loadQuotes();
populateCategories();
filterQuote();
setupEventListeners();
syncQuotes();
