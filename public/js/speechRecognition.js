export default function speechRecognition(input) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'hu';
  recognition.start();

  recognition.onresult = function (event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    input.value = transcript;
  };
}