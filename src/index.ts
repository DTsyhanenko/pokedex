const poke_container = document.querySelector<HTMLDivElement>('#poke-container')

const pokemon_count: number = 150

type hex = `#${string}`
type Color = {
    fire: hex,
    grass: hex,
    electric: hex,
    water: hex,
    ground: hex,
    rock: hex,
    fairy: hex,
    poison: hex,
    bug: hex,
    dragon: hex,
    psychic: hex,
    flying: hex,
    fighting: hex,
    normal: hex
}

const colors: Color = {
    fire: '#fddfdf',
    grass: '#defde0',
    electric: '#fcf7de',
    water: '#def3fd',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#f5f5f5',
    fighting: '#e6e0d4',
    normal: '#f5f5f5'
}

const main_types: string[] = Object.keys(colors)


const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id: number) => {
    const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    //console.log(data)
    createPokemonCard(data)
}

const createPokemonCard = (pokemon: any) => {
    const pokemonEl = document.createElement('div') as HTMLDivElement
    pokemonEl.classList.add('pokemon')

    const name: string = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id: number = pokemon.id.toString().padStart(3, '0')

    const poke_types: string[] = pokemon.types.map((type: { type: { name: string } }) => type.type.name)

    const type  = main_types.find((type: string) => poke_types.indexOf(type) > -1)
    const color: string = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="alt">
    </div>
    <div class="info"> 
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container?.appendChild(pokemonEl)

}

fetchPokemons()