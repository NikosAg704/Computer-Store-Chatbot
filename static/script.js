// static/script.js
// Chatbot client-side logic
let lang = "en"; // αρχική γλώσσα

// Στοιχεία του DOM
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const langBtn = document.getElementById("lang-btn");
const titleEl = document.getElementById("title");
const quickButtons = document.querySelectorAll("#quick-questions button");
const chatBox = document.getElementById("chat-box");
const welcomeMsgEl = document.getElementById("welcome-msg");

// Variable για το "typing" indicator (αν υπάρχει)
let currentTypingDiv = null;

// Αρχικές ρυθμίσεις (σε περίπτωση που θέλεις να φορτώσεις την σωστή γλώσσα από την αρχή)
function initializeLanguageUI() {
    if (lang === "en") {
        titleEl.innerText = "Computer Store Chatbot";
        userInput.placeholder = "Type your message...";
        langBtn.innerText = "Ελληνικά";
        quickButtons[0].innerText = "Hours";
        quickButtons[1].innerText = "Card";
        quickButtons[2].innerText = "Location";
        quickButtons[3].innerText = "Services";
        if (welcomeMsgEl) welcomeMsgEl.innerText = "Hello! How can I help you today?";
    } else {
        titleEl.innerText = "Chatbot Καταστήματος Υπολογιστών";
        userInput.placeholder = "Πληκτρολογήστε το μήνυμά σας...";
        langBtn.innerText = "English";
        quickButtons[0].innerText = "Ώραριο";
        quickButtons[1].innerText = "Κάρτα";
        quickButtons[2].innerText = "Τοποθεσία";
        quickButtons[3].innerText = "Υπηρεσίες";
        if (welcomeMsgEl) welcomeMsgEl.innerText = "Γεια σας! Πώς μπορώ να σας βοηθήσω σήμερα;";
    }
}

// Κλήσεις event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});
langBtn.addEventListener("click", toggleLanguage);

quickButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        sendQuickQuestion(btn.getAttribute("data-q"));
    });
});

// Εναλλαγή γλώσσας (εναλλάσσει UI + welcome message)
function toggleLanguage() {
    // Αλλάζουμε την κατάσταση της γλώσσας
    if (lang === "en") {
        lang = "gr";
    } else {
        lang = "en";
    }
    // Ενημερώνουμε το UI
    initializeLanguageUI();

    // Προαιρετικά: αν θέλεις να καθαρίζει το chat όταν αλλάζει γλώσσα,
    // ξεσχολίασε την επόμενη γραμμή:
    // chatBox.innerHTML = ''; chatBox.appendChild(welcomeMsgEl); // reset

    // Αν δεν υπάρχει ήδη το welcome-msg στο chat (π.χ. αν το reset ήταν on),
    // φροντίζουμε να υπάρχει σωστό μήνυμα.
    if (welcomeMsgEl && !document.getElementById("welcome-msg")) {
        const div = document.createElement("div");
        div.id = "welcome-msg";
        div.className = "bot-message";
        div.innerText = (lang === "en") ? "Hello! How can I help you today?" : "Γεια σας! Πώς μπορώ να σας βοηθήσω σήμερα;";
        chatBox.insertBefore(div, chatBox.firstChild);
    }
}

// Στέλνει το μήνυμα που πληκτρολόγησε ο χρήστης
function sendMessage() {
    const msg = userInput.value.trim();
    if (msg === "") return;
    appendMessage(msg, "user");
    userInput.value = "";
    // Αποστολή στο backend
    postQuestion(msg);
}

// Στέλνει γρήγορη ερώτηση (buttons)
function sendQuickQuestion(q) {
    // Εμφανίζουμε την επιλογή του χρήστη σαν μήνυμα
    // (εφόσον θέλεις να εμφανίζεται στην τοπική γλώσσα, θα χρειαστείς mapping.
    //  εδώ εμφανίζουμε το 'q' όπως είναι—που αντιστοιχεί σε keywords)
    appendMessage(q, "user");
    postQuestion(q);
}

// Κάνει το fetch στο /ask και χειρίζεται το typing indicator
function postQuestion(questionText) {
    // Δημιουργούμε/εμφανίζουμε typing indicator
    showTypingIndicator();

    fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText, lang: lang })
    })
    .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
    })
    .then(data => {
        // Αφαιρούμε typing indicator και προσθέτουμε απάντηση
        removeTypingIndicator();
        appendMessage(data.answer, "bot");
    })
    .catch(err => {
        removeTypingIndicator();
        appendMessage((lang === "en") ? "Error: Could not reach server." : "Σφάλμα: Δεν ήταν δυνατή η σύνδεση με τον server.", "bot");
        console.error(err);
    });
}

// Εμφάνιση typing indicator (π.χ. "...")
function showTypingIndicator() {
    // Αν υπάρχει ήδη, μην προσθέτεις νέο
    if (currentTypingDiv) return;
    const div = document.createElement("div");
    div.className = "bot-message typing";
    div.innerText = (lang === "en") ? "Typing..." : "Γράφει...";
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    currentTypingDiv = div;
}

// Αφαίρεση typing indicator
function removeTypingIndicator() {
    if (!currentTypingDiv) return;
    chatBox.removeChild(currentTypingDiv);
    currentTypingDiv = null;
}

// Append message to chat box (user ή bot)
function appendMessage(msg, type) {
    // Αν type === "user" ή "bot"
    const div = document.createElement("div");
    div.className = (type === "user") ? "user-message" : "bot-message";
    div.innerText = msg;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Αρχική εκτέλεση για να φορτώσει σωστά τα labels
initializeLanguageUI();
