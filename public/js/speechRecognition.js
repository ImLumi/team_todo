/* eslint-disable no-param-reassign */
export default function speechRecognition(voiceButton, input) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.addEventListener('audiostart', () => {
    voiceButton.classList.add('voice-active');
  });

  recognition.addEventListener('audioend', () => {
    voiceButton.classList.remove('voice-active');
  });
  recognition.lang = 'hu';
  recognition.start();

  recognition.onresult = (event) => {
    const current = event.resultIndex;

    const { transcript } = event.results[current][0];
    input.value = transcript;
  };
}
