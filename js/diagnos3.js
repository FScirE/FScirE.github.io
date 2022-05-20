function getImage(input) {
    return "img//" + input;
}

function generateCard() {
    var resultBox = document.querySelector("#result");
    var color = document.querySelector("#color").value;
    var text = document.querySelector("#text").value;
    var image = getImage(document.querySelector("#image").value)

    resultBox.innerHTML = "";
    resultBox.innerHTML = `
        <div id="card">
            <h2>${text}</h2>
            <img src="${image}" alt="card image">  
        </div>
    `;
    document.querySelector("#card").style.backgroundColor = color;
}