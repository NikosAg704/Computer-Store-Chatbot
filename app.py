from flask import Flask, render_template, request, jsonify
import time

app = Flask(__name__)

responses = {
    "en": {
        "hours": "Our store is open from 9:00 to 18:00 every day.",
        "card": "We accept all major credit and debit cards.",
        "location": "We are located at 123 Tech Street, Athens.",
        "services": "We offer repairs, custom PC builds, and tech support.",

        "laptops": "We offer laptops for work, gaming, and studies. Tell me your budget or usage.",
        "gaming": "We have gaming laptops and PCs with dedicated GPUs.",
        "specs": "Our systems include Intel or AMD CPUs, SSD storage, and upgradable RAM.",
        "compare": "Tell me the models you want to compare.",
        "availability": "Please mention the product name to check availability.",
        "warranty": "All laptops and PCs come with at least 2 years warranty.",
        "upgrades": "We offer RAM and SSD upgrades.",
        "gadgets": "We sell monitors, keyboards, mice, headsets, and other gadgets.",

        "default": "Sorry, I didn't understand. Can you ask something else?"
    },
    "gr": {
        "hours": "Το κατάστημά μας είναι ανοιχτό από τις 9:00 έως τις 18:00 κάθε μέρα.",
        "card": "Δεχόμαστε όλες τις μεγάλες πιστωτικές και χρεωστικές κάρτες.",
        "location": "Βρισκόμαστε στην οδό Τεχνολογίας 123, Αθήνα.",
        "services": "Προσφέρουμε επισκευές, custom συναρμολογήσεις και τεχνική υποστήριξη.",

        "laptops": "Διαθέτουμε laptop για εργασία, gaming και σπουδές.",
        "gaming": "Έχουμε gaming laptop και PC με ισχυρές κάρτες γραφικών.",
        "specs": "Διαθέτουμε Intel και AMD επεξεργαστές, SSD και αναβαθμίσιμη RAM.",
        "compare": "Πες μου ποια μοντέλα θέλεις να συγκρίνουμε.",
        "availability": "Πες μου ποιο προϊόν σε ενδιαφέρει.",
        "warranty": "Όλα τα laptop και PC έχουν 2 χρόνια εγγύηση.",
        "upgrades": "Προσφέρουμε αναβαθμίσεις RAM και SSD.",
        "gadgets": "Διαθέτουμε οθόνες, πληκτρολόγια, ποντίκια και άλλα gadgets.",

        "default": "Λυπάμαι, δεν κατάλαβα. Μπορείς να ρωτήσεις κάτι άλλο;"
    }
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get("question", "").lower()
    lang = data.get("lang", "en")

    time.sleep(1)

    if "hour" in question or "ώρα" in question:
        answer = responses[lang]["hours"]

    elif "card" in question or "κάρτα" in question:
        answer = responses[lang]["card"]

    elif "location" in question or "τοποθεσία" in question:
        answer = responses[lang]["location"]

    elif "service" in question or "υπηρεσί" in question:
        answer = responses[lang]["services"]

    elif any(k in question for k in ["laptop", "notebook", "φορητό"]):
        answer = responses[lang]["laptops"]

    elif any(k in question for k in ["gaming", "gpu", "παιχνίδια", "κάρτα γραφικών"]):
        answer = responses[lang]["gaming"]

    elif any(k in question for k in ["ram", "ssd", "χαρακτηριστικά", "επεξεργαστή"]):
        answer = responses[lang]["specs"]

    elif any(k in question for k in ["vs", "compare", "σύγκρι"]):
        answer = responses[lang]["compare"]

    elif any(k in question for k in ["stock", "available", "διαθέσιμο", "απόθεμα"]):
        answer = responses[lang]["availability"]

    elif any(k in question for k in ["warranty", "εγγύηση"]):
        answer = responses[lang]["warranty"]

    elif any(k in question for k in ["upgrade", "αναβάθμι"]):
        answer = responses[lang]["upgrades"]

    elif any(k in question for k in ["mouse", "keyboard", "monitor", "οθόνη", "ποντίκι", "gadget"]):
        answer = responses[lang]["gadgets"]

    else:
        answer = responses[lang]["default"]

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
