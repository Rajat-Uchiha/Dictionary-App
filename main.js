//! MAIN JAVASCRIPT FILE

const fetchBtn = document.getElementById('fetchBtn');
const searchedWord = document.getElementById('searchedWord');
const mainResponse = document.getElementById('mainResponse');


fetchBtn.addEventListener('click', () => {

    //*Arrays to store necessary data from api.
    let partOfSpeechArr = [];
    let definitionsArr = [];
    let ExamplesArr = [];

    //*fetchedData Promise returned by fetchData();
    const fetchedData = fetchData();

    //*Handling the promise
    fetchedData.then(data => {
        const wordData = data[0].meanings;

        for (let i = 0; i < wordData.length; i++) {
            partOfSpeechArr.push(wordData[i].partOfSpeech);
            definitionsArr.push(wordData[i].definitions[0].definition ? wordData[i].definitions[0].definition : 'No definition available.');
            ExamplesArr.push(wordData[i].definitions[0].example ? wordData[i].definitions[0].example : 'No example available.');
        }

        const result = `
        <div class=" my-4 mx-8 ">
        <h4 class="text-3xl text-white font-semibold">Your word is <span
                class="font-3xl font font-semibold text-green-600">${searchedWord.value}</span>
        </h4>
        </div>
        <div class=" my-4 mx-8 ">
            <h4 class="text-3xl text-white font-semibold">Meanings:- shown below </h4>
        </div>`
            ;
        document.getElementById('responseCard').innerHTML = result;

        for (let i = 0; i < partOfSpeechArr.length; i++) {
            let newCard = `<div class=" my-4 mx-8">
            <h4 class="text-2xl text-white font-semibold">${i + 1}. ${partOfSpeechArr[i].charAt(0).toUpperCase() + partOfSpeechArr[i].slice(1)} </h4>
            <h6 class="text-xl text-white font-semibold">Definition - ${definitionsArr[i]}</h6>
            <h6 class="text-xl text-white font-semibold">Example - ${ExamplesArr[i]}</h6>
        </div>`;
            mainResponse.innerHTML += newCard;
        }
        mainResponse.classList.remove('hidden');

    })
})

//*Fetch data function returns a promise.
async function fetchData() {

    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord.value}`);

    let data = await response.json();
    return data;

}
