const synth = window.speechSynthesis;
let voices = [];
const getAccents = () => {

    const textForm = document.querySelector("form");
    const textInput = document.querySelector("#returnedStory");
    const voiceSelect = document.querySelector("#voice-select");
    const rate = document.querySelector("#rate");
    const rateValue = document.querySelector("#rate-value");
    const pitch = document.querySelector("#pitch");
    const pitchValue = document.querySelector("#pitch-value");





    voices = synth.getVoices();
    console.log(voices)
    voices.forEach(voice => {
        const option = document.createElement("option");
        option.textContent = voice.name + "(" + voice.lang + ")";

        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);

        voiceSelect.appendChild(option);
    })

};

const readStory = () => {
    const textForm = document.querySelector("form");
    const textInput = document.querySelector("#returnedStory");
    const voiceSelect = document.querySelector("#voice-select");
    const rate = document.querySelector("#rate");
    const rateValue = document.querySelector("#rate-value");
    const pitch = document.querySelector("#pitch");
    const pitchValue = document.querySelector("#pitch-value");


    if (synth.speaking) {
        console.error("Currently reading")
        return;
    }

    if (textInput.value !== "") {
        const speakStory = new SpeechSynthesisUtterance(textInput.value);

        speakStory.onend = e => {
            console.log("Done with story")
        }
    }

    speakStory.onerror = e => {
        console.error("Something went wrong");
    }

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

    voices.forEach

};

getAccents();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getAccents;
};






export default getAccents;
