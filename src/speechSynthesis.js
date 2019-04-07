import { city, tempNow, weatherIcoNow, nextDaySections} from './app';
let speaks = [
    {
        "name": "Zosia",
        "lang": "pl-PL"
    },
    {
        "name": "Alex",
        "lang": "en-US"
    }];

const msg = new SpeechSynthesisUtterance();
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 1; // 0 to 2

function speakPolish () {
    const nextDaysText = ", jutro w dzień " + nextDaySections[0].children[2].firstElementChild.textContent
        + ", w nocy " + nextDaySections[0].children[2].lastElementChild.textContent
        + ", pojutrze w dzień " + nextDaySections[1].children[2].firstElementChild.textContent
        + ", w nocy " + nextDaySections[1].children[2].lastElementChild.textContent;
    msg.text = city.textContent.split(',')[0] + " obecnie " + tempNow.textContent + nextDaysText;
    console.log(msg.text);
    const voice = speaks[0];
    msg.voiceURI = voice.name;
    msg.lang = voice.lang;
    speechSynthesis.speak(msg);
}
function speakEnglish () {
    const nextDaysText = ", tomorrow it will be " + nextDaySections[0].children[2].firstElementChild.textContent
        + ", in night " + nextDaySections[0].children[2].lastElementChild.textContent
        + ", the day after tomorrow it will be " + nextDaySections[1].children[2].firstElementChild.textContent
        + ", and in the night " + nextDaySections[1].children[2].lastElementChild.textContent;
    msg.text = city.textContent.split(',')[0] + " There is " + tempNow.textContent + " right now "+ nextDaysText;
    console.log(msg.text);
    const voice = speaks[1];
    msg.voiceURI = voice.name;
    msg.lang = voice.lang;
    speechSynthesis.speak(msg);
}

export { speakPolish, speakEnglish };

