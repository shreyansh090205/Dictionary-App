const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            const phonetic = data[0].phonetics.find(p => p.audio); // Find phonetics entry with audio
            const audioUrl = phonetic ? phonetic.audio : null;

            result.innerHTML =
                `<div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick = "playSound()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || "No example available for this word"}
                </p>
            `;

            if (audioUrl) {
                sound.setAttribute("src", audioUrl);
            } else {
                console.log("No audio available for this word.");
            }
        })
        .catch(() => {
            // console.error('Error:');
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });

});
function playSound() {
    sound.play();
}
