const defaultDropdownList = ["Triple Tap", "Fourth Time's The Charm", "Deconstruct"];
var selectedPerks = [];

function dropdownClick(p) {
    let d = document.querySelectorAll('.dropdown');
    let buttonContent = p.parentElement.parentElement.querySelector('button').textContent;
    let perk = p.textContent;

    let index = defaultDropdownList.indexOf(perk);
    let dropdownList = [...defaultDropdownList];
    if (index != -1)
        dropdownList.splice(index, 1)

    //remove previous perk from selected
    let selectIndex = selectedPerks.indexOf(buttonContent);
    if (selectIndex != -1)
        selectedPerks.splice(selectIndex, 1);

    //update selected perk
    p.parentElement.parentElement.querySelector('button').textContent = perk;
    if (perk != "...")
        selectedPerks.push(perk);

    //rebuild dropdown list
    d.forEach((e) => {
        e.innerHTML = "";
        if (e.parentElement.querySelector("button").textContent != "...")
            e.innerHTML += `<p onclick="dropdownClick(this)">...</p>\n`
        for (let i = 0; i < dropdownList.length; i++) {
            if (selectedPerks.indexOf(dropdownList[i]) == -1)
                e.innerHTML += `<p onclick="dropdownClick(this)">${dropdownList[i]}</p>\n`;
        }
    });
}
