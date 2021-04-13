
let fetchButton = document.getElementById("fetchButton");
let input = document.getElementById("input");
let ability = document.getElementById("ability");

let url = "https://pokeapi.co/api/v2/pokemon/"

fetchButton.addEventListener("click", async event => {

    console.log("Fetch button pressed.")
    let inputString = input.value;
    let pokemon = inputString
    console.log(pokemon)

    try {
       //remove currently seen abilities to show new ones.
    } catch {

    }

    let response = await fetch(url)
    let data = await (await fetch(url + pokemon)).json()
    console.log(data)

    document.getElementById("pImg").src = data.sprites.front_default; 
    let pName = data.species.name
    document.getElementById("name").innerHTML = pName.charAt(0).toUpperCase() + pName.slice(1);

    for(i = 0; i < data.types.length; i++) {

        let typeText = data.types[i].type.name + "Text"
        let typeImg = document.createElement("img");
        
        typeImg.src = document.getElementById(typeText).src
        typeImg.style.height = "15px";
        typeImg.style.width = "50px";

        imgDiv.appendChild(typeImg);
    }

    for(i = 0; i < data.abilities.length; i++) {
        let aDiv = document.createElement("div")
        let aText = data.abilities[i].ability.name
        aDiv.innerHTML = aText.charAt(0).toUpperCase() + aText.slice(1);
        aDiv.className = "aDiv";
        ability.appendChild(aDiv)

        let aUrl = data.abilities[i].ability.url
        let a = 0
        console.log("Ability: ")
        let aData = await (await fetch(aUrl)).json()
        console.log(aData)

        let aDivInfo = document.createElement("div"); 
        aDivInfo.innerHTML = aData.effect_entries[1].short_effect
        aDivInfo.className = "aInfo";
        aDiv.appendChild(aDivInfo)
    }

    for(i = 0; i < data.types.length; i++) {

        console.log("Dmg relations: ")
        let dmgRelation = await (await fetch(data.types[i].type.url)).json()
        console.log(dmgRelation)

        
        for(i = 0; i < dmgRelation.damage_relations.double_damage_from.length; i++) {

            let relText1 = dmgRelation.damage_relations.double_damage_from[i].name;
            let dDF = document.createElement("img");
            dDF.src = document.getElementById(relText1 + "Text").src;
            dDF.style.height = "15px";
            dDF.style.width = "50px";
            doubleDmgFrom.appendChild(dDF);
        }
        

        for(i = 0; i < dmgRelation.damage_relations.double_damage_to.length; i++) {

            let relText2 = dmgRelation.damage_relations.double_damage_to[i].name;
            console.log( "Double dmg to: " + relText2)

            let dDT = document.createElement("img");
            dDT.src = document.getElementById(relText2 + "Text").src;
            dDT.style.height = "15px";
            dDT.style.width = "50px";
            doubleDmgTo.appendChild(dDT);
        }

        for(i = 0; i < dmgRelation.damage_relations.half_damage_to.length; i++) {

            let relText3 = dmgRelation.damage_relations.half_damage_to[i].name;
            let hDT = document.createElement("img");
            hDT.src = document.getElementById(relText3 + "Text").src;
            hDT.style.height = "15px";
            hDT.style.width = "50px";
            halfDmgTo.appendChild(hDT);
        } 
    }

})