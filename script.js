const API_KEY = 'AQ.Ab8RN6Lh5To5ghWVVGuPj12HFBsvX4O4uS4eQ40bf50_sLVdig';

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    addMessage(message, 'user');
    userInput.value = '';
    const loadingDiv = addMessage('Soch raha hoon...', 'bot loading');
    fetchAIResponse(message, loadingDiv);
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

async function fetchAIResponse(message, loadingDiv) {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: message }] }]
                })
            }
        );
        const data = await response.json();
        loadingDiv.classList.remove('loading');
        if (data.candidates && data.candidates[0]) {
            loadingDiv.textContent = data.candidates[0].content.parts[0].text;
        } else {
            loadingDiv.textContent = 'Kuch gadbad ho gayi, dobara try karein!';
        }
    } catch (error) {
        loadingDiv.classList.remove('loading');
        loadingDiv.textContent = 'Error: API key check karein!';
    }
}
