import { PokemonResumo } from "../models/Pokemon";
import { formatPokemon, formatMessage } from "../utils/textFormatters";

export class pokemonCatalog {
  private pokemons: PokemonResumo[] = [];

  public addPokemon(pokemon: PokemonResumo): void {
    const exist = this.pokemons.some((item) => item.id === pokemon.id);
    if (exist) {
      console.log(formatMessage("AVISO", `${pokemon.name} já está no catálogo.`));
      return;
    }
    this.pokemons.push(pokemon);
    console.log(formatMessage("OK", `${pokemon.name} adicionado ao catálogo.`));
  }

  public listPokemon(): void {
    if (this.pokemons.length === 0) {
      console.log(formatMessage("AVISO", "Catálogo vazio."));
      return;
    }

    console.log("\nCatálogo atual:");


    this.pokemons.forEach((pokemon): void => {
      console.log(formatPokemon(pokemon));
    })
  }

}
