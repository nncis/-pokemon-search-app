const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const statsDisplay = document.getElementById("stats-main-screen");
const mainScreen = document.getElementById("display");
const searchForm = document.getElementById('search-form');
const weightDisplay = document.getElementById("weight");
const heightDisplay = document.getElementById("height");
const statsName = document.querySelectorAll(".table-name-stat");
const pokemonTypes = document.getElementById("types");
const stats = document.getElementById("stats");
const [hp, attack, defense, specialAttack, specialDefense, speed] = stats.querySelectorAll(".table-stats");
const nameId = document.getElementById("name-id");
const [pokemonName, pokemonId] = nameId.querySelectorAll("p");

const showTypes = (type) => {

	let pElements = pokemonTypes.querySelectorAll("p");

	pElements.forEach((p) => {
		p.remove()
	});

	type.forEach((elem) => {
		pokemonTypes.innerHTML += `<p>${elem.type.name}</p>`
	});

};

const showPokemonNameAndId = (name, id) => {
	pokemonName.innerText = `${name.toUpperCase()}`;
	pokemonId.innerText = `#${id}`;
};

const showStats = (statsObj, weight, height) => {
    
	const [
		{base_stat: baseHp},
		{base_stat: baseAttack},
		{base_stat: baseDefense},
		{base_stat: baseSpecialAttack}, 
		{base_stat: baseSpecialDefense}, 
		{base_stat: baseSpeed}
	] = statsObj;

    statsName[0].innerText = "Hp: ";
    statsName[1].innerText = "Attack: ";
    statsName[2].innerText = "Defense: ";
    statsName[3].innerText = "Sp. Attack: ";
    statsName[4].innerText = "Sp. Defense: ";
    statsName[5].innerText = "Speed: ";

	hp.innerText = `${baseHp}`;
	attack.innerText = `${baseAttack}`;
	defense.innerText = `${baseDefense}`;
	specialAttack.innerText = `${baseSpecialAttack}`;
	specialDefense.innerText = `${baseSpecialDefense}`;
	speed.innerText = `${baseSpeed}`;

	weightDisplay.innerText = `Weight: ${weight}`;
	heightDisplay.innerText = `Height: ${height}`;
};

const showPokemonImg = (sprite) => {

	let img = mainScreen.querySelector("img");

	if (img) {
		img.src = `${sprite}`
	} else {
		let pokemonImg = document.createElement("img");
		pokemonImg.id = "sprite";
		pokemonImg.src = `${sprite}`;
		mainScreen.appendChild(pokemonImg);
	}
};

const searchPokemon = async () => {
    try {
        const pokemonIdName = searchInput.value.toLowerCase();
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonIdName}`);
        const data = await res.json();

        console.log(pokemonIdName);

        const { name, id, weight, height, types, stats, sprites: { front_default } } = data;

        showTypes(types);
        showPokemonNameAndId(name, id);
        showPokemonImg(front_default);
        showStats(stats, weight, height);

       searchInput.value = "";

    } catch(err) {
        alert("Pokémon not found")
    }
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPokemon();
});