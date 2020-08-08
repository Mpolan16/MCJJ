const synth = window.speechSynthesis;

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

export default readStory;