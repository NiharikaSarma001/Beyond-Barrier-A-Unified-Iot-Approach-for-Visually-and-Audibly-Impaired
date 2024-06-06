const button = document.getElementById('myButton');
const morseText = document.getElementById('morseText');
const resetButton = document.getElementById('resetButton');
const backspaceButton = document.getElementById('backspaceButton');

let morseCode = '';
let isHolding = false;
let pressStartTime = null;
let timeout = null;

button.addEventListener('mousedown', () => {
    isHolding = true;
    pressStartTime = Date.now();
});

const translateButton = document.getElementById('translateButton');
const morseInput = document.getElementById('morseInput');

translateButton.addEventListener('click', () => {
    const morseCodeInput = morseInput.value.trim(); // Get the Morse code input from the text field
    
    // Translate the Morse code input into text and display it
    morseText.textContent += translateMorseCode(morseCodeInput);
    
    // Clear the Morse code input field
    morseInput.value = '';
});

button.addEventListener('mouseup', () => {
    isHolding = false;
    const pressDuration = Date.now() - pressStartTime;

    if (pressDuration >= 2000) { // If holding for more than 2 seconds, it's a dash
        morseCode += '-';
    } else { // If less than 2 seconds, it's a dot
        morseCode += '.';
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (!isHolding) { // If not holding, display translation after a delay
            morseText.textContent += translateMorseCode(morseCode);
            morseCode = '';
        }
    }, 1000); // Adjust as needed
});

resetButton.addEventListener('click', () => {
    morseText.textContent = '';
    morseCode = '';
});

// Add event listener for the speaker icon
const speakerIcon = document.querySelector('.speaker-icon');
speakerIcon.addEventListener('click', () => {
    speakMorseCode(morseText.textContent);
});

backspaceButton.addEventListener('click', () => {
    morseText.textContent = morseText.textContent.slice(0, -1); // Remove the last character
});

function translateMorseCode(code) {
    // Morse code to text translation object
    const morseToText = {
        '.-': 'A',
        '-...': 'B',
        '-.-.': 'C',
        '-..': 'D',
        '.': 'E',
        '..-.': 'F',
        '--.': 'G',
        '....': 'H',
        '..': 'I',
        '.---': 'J',
        '-.-': 'K',
        '.-..': 'L',
        '--': 'M',
        '-.': 'N',
        '---': 'O',
        '.--.': 'P',
        '--.-': 'Q',
        '.-.': 'R',
        '...': 'S',
        '-': 'T',
        '..-': 'U',
        '...-': 'V',
        '.--': 'W',
        '-..-': 'X',
        '-.--': 'Y',
        '--..': 'Z',
        '.----': '1',
        '..---': '2',
        '...--': '3',
        '....-': '4',
        '.....': '5',
        '-....': '6',
        '--...': '7',
        '---..': '8',
        '----.': '9',
        '-----': '0',
        '--..--': ',',
        '.-.-.-': '.',
        '..--..': '?',
        '-..-.': '/',
        '-....-': '-',
        '-.--.': '(',
        '-.--.-': ')',
        '.----.': "'",
        '-...-': '=',
        '.-.-.': '+',
        '.--.-.': '@',
        '...---...': 'SOS',
        ' ': ' ' // Adding space translation
    };
    
    return morseToText[code] || '';
}

function speakMorseCode(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7; // Adjust the speaking rate as needed
    speechSynthesis.speak(utterance);
}


// Add event listener for the microphone icon
const micIcon = document.querySelector('.microphone-icon');
micIcon.addEventListener('click', () => {
    const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition
    recognition.lang = 'en-US'; // Set language to English (change as needed)
    recognition.start(); // Start recognition

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get the transcript of the speech
        morseText.textContent += transcript; // Append the transcript to the text on the screen
    };

    recognition.onend = () => {
        recognition.stop(); // Stop recognition after speech ends
    };
});
