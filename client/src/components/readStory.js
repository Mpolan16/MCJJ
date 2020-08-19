import React, { Component } from "react";
import Translator from "./translate.js"
import '../pages/CreateStory/createStory.css';
// import { translateAliases } from "../../../models/users";
let synth = window.speechSynthesis;
let voices = [];





class SpeechContainer extends Component {
    state = {
        pitch: 1,
        rate: 1,
    }



    componentDidMount = () => {
        window.addEventListener('beforeunload', this.componentCleanup);
        this.getAccents();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = this.getAccents;
        };

        let inputWords = document.querySelectorAll(".inputWords");
        for (let i = 0; i < inputWords.length; i++) {
            inputWords[i].addEventListener("click", () => this.speakWord(inputWords[i].textContent));
        }

    }

    componentWillUnmount = () => {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    componentCleanup = () => {
        synth.cancel();
    }

    getAccents = () => {
        const voiceSelect = document.querySelector("#voice-select");

        voices = synth.getVoices();
        voices.forEach(voice => {
            const option = document.createElement("option");
            option.textContent = voice.name;

            option.setAttribute("data-lang", voice.lang);
            option.setAttribute("data-name", voice.name);

            // if (option.getAttribute("data-lang") === "en-US" || option.getAttribute("data-lang") === "en-GB" || option.getAttribute("data-lang") === "es-US") {
            //     voiceSelect.appendChild(option);
            // }
            voiceSelect.appendChild(option);
        })

    };

    Speak = (userStory, voices) => {


        console.log(this.props.styledStory)

        const voiceSelect = document.querySelector("#voice-select");

        if (synth.speaking) {
            console.error("Currently reading");
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

        for (let i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedVoice) {
                speakStory.voice = voices[i];
                speakStory.lang = voices[i].lang;
            }
        }

        speakStory.rate = this.state.rate;
        speakStory.pitch = this.state.pitch;
        speakStory.volume = 1;

        console.log(speakStory)

        synth.speak(speakStory)

        const resume = setInterval(function () {
            console.log(synth.speaking);
            if (!synth.speaking || synth.paused) clearInterval(resume);
            else synth.resume();
        }, 4000);
    };

    speakWord = (clickedWord) => {
        const speakWord = new SpeechSynthesisUtterance(clickedWord);
        synth.speak(speakWord);

    }


    changeRate = (e) => {
        this.setState({ rate: e.target.value })
    }
    changePitch = (e) => {
        this.setState({ pitch: e.target.value })
    }

    Pause = () => {
        if (synth.paused) {
            synth.resume();
            const resume = setInterval(function () {
                console.log(synth.speaking);
                if (!synth.speaking || synth.paused) clearInterval(resume);
                else synth.resume();
            }, 4000);
        }
        console.log("paused")
        synth.pause();
    }





    render() {

        return (
            <div className="">
                <div className="returnedStory" dangerouslySetInnerHTML={{ __html: this.props.styledStory }} />
                <button className="read-btns">New Story</button>
                <button onClick={() => synth.cancel()} className="read-btns">Stop</button>
                <button onClick={() => this.Pause()} className="read-btns">Pause/Resume</button>
                <button onClick={() => this.Speak(this.props.story, voices)} className="read-btns">Read</button>

                <div className="slider-div">
                    <label className="slider-label" htmlFor="rate">Rate</label>
                    <div id="rate-value" className="badge" htmlFor="rate">{this.state.rate}</div>
                    <input onChange={this.changeRate} value={this.state.value} className="slider" type="range" id="rate" min="0" max="2" defaultValue="1" step="0.1"></input>
                </div>

                <div className="slider-div">
                    <label className="slider-label" htmlFor="pitch">Pitch</label>
                    <div id="pitch-value" className="badge" htmlFor="pitch">{this.state.pitch}</div>
                    <input onChange={this.changePitch} value={this.state.value} className="slider" type="range" id="pitch" min="0" max="2" defaultValue="1" step="0.1"></input>
                </div>

                <div className="form-group">
                    <select id="voice-select" className="form-control" style={{ width: "500px" }}></select>
                </div>
                <button className="btn"></button>
            </div>
        );
    }
}

export default SpeechContainer;