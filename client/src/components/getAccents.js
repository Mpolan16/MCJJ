// const synth = window.speechSynthesis;



// const textForm = document.querySelector("form");
// const textInput = document.querySelector("#returnedStory");
// const voiceSelect = document.querySelector("#voice-select");
// const rate = document.querySelector("#rate");
// const rateValue = document.querySelector("#rate-value");
// const pitch = document.querySelector("#pitch");
// const pitchValue = document.querySelector("#pitch-value");


// let voices = [];

// const getAccents = () => {
//     voices = synth.getVoices();
//     console.log(voices)
//     voices.forEach(voice => {
//         const option = document.createElement("option");
//         option.textContent = voice.name + "(" + voice.lang + ")";

//         option.setAttribute("data-lang", voice.lang);
//         option.setAttribute("data-name", voice.name);

//         voiceSelect.appendChild(option);
//     })

// };

// getAccents();
// if (synth.onvoiceschanged !== undefined) {
//     synth.onvoiceschanged = getAccents;
// };


// export default getAccents;