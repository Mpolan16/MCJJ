const synth = window.speechSynthesis;

const readStory = (userStory) => {

    console.log(userStory);

    const textForm = document.querySelector("form");
    const textInput = document.querySelector("#returnedStory");
    const voiceSelect = document.querySelector("#voice-select");
    const rate = document.querySelector("#rate");
    const rateValue = document.querySelector("#rate-value");
    const pitch = document.querySelector("#pitch");
    const pitchValue = document.querySelector("#pitch-value");

    // let voices = [];
    // let badVoices = voiceSelect.children;
    // for (var i = 0; i < badVoices.length; i++) {
    //     voices.push(badVoices[i]);
    // }
    // console.log(voices);


    let voices = [];
    voices.push(voiceSelect.children);

    console.log(voices);

    if (synth.speaking) {
        console.error("Currently reading")
        return;
    }


    const speakStory = new SpeechSynthesisUtterance(userStory);


    speakStory.onend = e => {
        console.log("Done with story")
    }


    speakStory.onerror = e => {
        console.error("Something went wrong");
    }

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

    console.log(selectedVoice)

    console.log(speakStory.voice)

    speakStory.voice.name = selectedVoice;
    speakStory.voice.lang = "en-US";
    console.log(speakStory);

    // voices.forEach(voice => {
    //     if (voice === selectedVoice) {
    //         speakStory.voice = voice;
    //         console.log(speakStory)
    //     }
    // });

    speakStory.rate = rate.value;
    speakStory.pitch = pitch.value;

    // console.log(speakStory)

    synth.speak(userStory)

};

export default readStory;