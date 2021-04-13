
let fetchButton = document.getElementById("fetchButton");
let input = document.getElementById("input");
let ability = document.getElementById("ability");
let search = 0
let url = "https://pokeapi.co/api/v2/pokemon/"


fetchButton.addEventListener("click", async event => {
    search = 1
    console.log("Fetch button pressed.")
    let inputString = input.value;
    let pokemon = inputString.toLowerCase()
    console.log(pokemon)

    let response = await fetch(url)
    let data = await (await fetch(url + pokemon)).json()
    console.log(data)

    document.getElementById("pImg").src = data.sprites.front_default; 
    let pName = data.species.name
    document.getElementById("name").innerHTML = pName.charAt(0).toUpperCase() + pName.slice(1);

    imgDiv.innerHTML = "";
    for(i = 0; i < data.types.length; i++) {

        let typeText = data.types[i].type.name + "Text"
        let typeImg = document.createElement("img");
        
        typeImg.src = document.getElementById(typeText).src
        typeImg.style.height = "15px";
        typeImg.style.width = "50px";
        typeImg.style.display = "block";
        imgDiv.appendChild(typeImg);
    }

    ability.innerHTML = "";
    
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
        var dmgRelation = await (await fetch(data.types[i].type.url)).json()
        console.log(dmgRelation)
       
        if(search === 1) {
            doubleDmgFrom.innerHTML = "";
            doubleDmgTo.innerHTML = "";
            halfDmgFrom.innerHTML = "";
            halfDmgTo.innerHTML = "";
            search = 0
        }
       
        for(j = 0; j < dmgRelation.damage_relations.double_damage_from.length; j++) {

            let relText1 = dmgRelation.damage_relations.double_damage_from[j].name;
            let dDF = document.createElement("img");
            dDF.src = document.getElementById(relText1 + "Text").src;
            dDF.style.height = "15px";
            dDF.style.width = "50px";
            doubleDmgFrom.appendChild(dDF);
            console.log(relText1)
        }

        
        for(j = 0; j < dmgRelation.damage_relations.double_damage_to.length; j++) {

            let relText2 = dmgRelation.damage_relations.double_damage_to[j].name;
            console.log( "Double dmg to: " + relText2)

            let dDT = document.createElement("img");
            dDT.src = document.getElementById(relText2 + "Text").src;
            dDT.style.height = "15px";
            dDT.style.width = "50px";
            doubleDmgTo.appendChild(dDT);
        }

        
        for(j = 0; j < dmgRelation.damage_relations.half_damage_from.length; j++) {

            let relText3 = dmgRelation.damage_relations.half_damage_from[j].name;
            let hDF = document.createElement("img");
            hDF.src = document.getElementById(relText3 + "Text").src
            hDF.style.height = "15px";
            hDF.style.width = "50px";
            halfDmgFrom.appendChild(hDF)
        }

        
        for(j = 0; j < dmgRelation.damage_relations.half_damage_to.length; j++) {

            let relText4 = dmgRelation.damage_relations.half_damage_to[j].name;
            let hDT = document.createElement("img");
            hDT.src = document.getElementById(relText4 + "Text").src;
            hDT.style.height = "15px";
            hDT.style.width = "50px";
            halfDmgTo.appendChild(hDT);
        }
    }
})