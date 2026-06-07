import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon"
import { APIError } from "../models/CustomErrors"

const BASE_URL = "https://pokeapi.co/api/v2/pokemon"

function extrairStat(stats: PokemonApiResponse["stats"], namStat: string): number {
  const stat = stats.find((s) => s.stat.name === namStat);
  return stat ? stat.base_stat : 0;
}

export async function searchPokemon(nameOrId: string): Promise<PokemonResumo | null> {
  try {
    const response = await fetch(`${BASE_URL}/${nameOrId.toLowerCase().trim()}`);

    if (!response.ok) {
      console.log(`[ERRO] Pokémon não encontrado: ${nameOrId}`);
      return null;
    }

    const dates = await response.json() as PokemonApiResponse;
    const type = dates.type.map((item) => item.type.name);

    const pokemon: PokemonResumo = {
      id: dates.id,
      name: dates.name,
      type,
      height: dates.height,
      weight: dates.weight,
      hp: extrairStat(dates.stats, "hp"),
      attack: extrairStat(dates.stats, "attack"),
      defense: extrairStat(dates.stats, "defense"),
    };

    console.log(`[OK] Pokémon encontrado: ${pokemon.name}`);
    return pokemon;

  } catch (erro) {
    throw new APIError(`Não foi possível buscar o Pokémon: ${nameOrId}`);
  }
}