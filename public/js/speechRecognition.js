/* eslint-disable no-param-reassign */

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let isActive = false;

export function startSpeechRecognition(voiceButton, input) {
  if (isActive) {
    recognition.stop();
  } else {
    recognition.start();
  }
  isActive = !isActive;
  recognition.addEventListener('audiostart', () => {
    voiceButton.classList.add('voice-active');
  });
  recognition.addEventListener('audioend', () => {
    voiceButton.classList.remove('voice-active');
  });
  recognition.lang = 'hu';
  recognition.onresult = (event) => {
    const current = event.resultIndex;

    const { transcript } = event.results[current][0];
    input.value = transcript;
  };
}

export function stopSpeechRecognition() {
  // recognition.stop();
  console.log('first');
}
