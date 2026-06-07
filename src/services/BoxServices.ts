import { PokemonResumo } from "../models/Pokemon";
import { formatPokemon, formatMessage } from "../utils/textFormatters";

export class CatalogoPokemon {
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
}
