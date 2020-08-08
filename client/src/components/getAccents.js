const synth = window.speechSynthesis;

const getAccents = () => {
    let voices = [];
    const voiceSelect = document.querySelector("#voice-select");

    voices = synth.getVoices();
    console.log(voices)
    voices.forEach(voice => {
        const option = document.createElement("option");
        option.textContent = voice.name + "(" + voice.lang + ")";

        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);
        console.log("hiiii");
        voiceSelect.appendChild(option);
    })

};

// getAccents();
// if (synth.onvoiceschanged !== undefined) {
//     synth.onvoiceschanged = getAccents;
// };


export default getAccents;