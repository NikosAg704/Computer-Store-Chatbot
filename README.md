📌 Project Overview

This project is a lightweight, rule-based chatbot for a computer and technology store, built using Flask (Python).
It is designed to provide basic customer support and pre-sales information for products such as laptops, desktop PCs, gaming systems, upgrades, and tech gadgets.

The chatbot operates without visible suggestions or guided menus for advanced topics. Instead, it responds only when the user types a relevant question, simulating a natural conversation and keeping the interface clean and simple.

🧠 How the Chatbot Works

The chatbot uses keyword-based intent recognition on the backend:

User messages are sent to a Flask REST endpoint (/ask)

The message is normalized (lowercase) and matched against predefined keyword groups

Each keyword group maps to a specific intent (e.g. laptops, gaming, upgrades, warranty)

If a match is found, the chatbot returns the appropriate response

If no intent is detected, a default fallback message is returned

No external APIs, NLP libraries, or AI models are used, ensuring fast response times and full control over behavior.

🌍 Language Support

The chatbot supports bilingual interaction:

English (EN)

Greek (GR)

Both the user interface and chatbot responses automatically adjust based on the selected language.

💻 Supported Topics

The chatbot can handle user questions related to:

Laptop and notebook availability

Gaming laptops and PCs (GPU-based systems)

Technical specifications (CPU, RAM, SSD)

Hardware upgrades (RAM / SSD)

Product comparison requests

Warranty information

Stock availability

Tech gadgets and peripherals (monitors, keyboards, mice, headsets)

Store information (hours, location, services, payment methods)

All advanced topics are handled silently in the background, without appearing as buttons or suggested questions.

💬 Example User Questions

Below are some example questions that users can type to interact with the chatbot:

“Do you have gaming laptops?”

“Can I upgrade the RAM or SSD?”

“What warranty do your laptops have?”

“Do you sell monitors or other tech gadgets?”

These questions demonstrate how the chatbot responds to natural user input without showing predefined options or suggestions in the interface.

🎯 Project Goals

Provide a simple and intuitive customer support chatbot

Keep the frontend UI minimal and uncluttered

Demonstrate rule-based intent handling in Flask

Serve as a foundation for future expansion (NLP, AI, CRM integration)

🔧 Extensibility

The project is intentionally structured to be easy to extend:

New intents can be added by defining keyword groups and responses

Responses can be customized per language

The chatbot can later be upgraded to use NLP or AI models without changing the frontend

🚀 Use Cases

Small or local computer stores

Educational Flask projects

Prototyping chatbot logic

Pre-sales product assistance
