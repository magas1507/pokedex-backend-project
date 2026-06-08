import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon"
import { APIError } from "../models/CustomErrors"
import fetch from "node-fetch";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon"

function extrairStat(stats: PokemonApiResponse["stats"], namStat: string): number {
  const stat = stats.find((s) => s.stat.name === namStat);
  return stat ? stat.base_stat : 0;
}

export async function searchPokemon(nameOrId: string): Promise<PokemonResumo | null> {
  try {
    const urlComplet = `${BASE_URL}/${nameOrId.toLowerCase()}`;
    const response = await fetch(urlComplet);

    if (!response.ok) {
      throw new APIError(`[ERRO] Pokémon não encontrado: ${nameOrId}`);
    }

    const dates = await response.json() as PokemonApiResponse;


    const type = dates.types.map((item) => item.type.name);

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
    if (erro instanceof APIError) {
      console.log(erro.message);
    } else {
      console.log(`[ERRO] Falha interna ao processar o Pokémon: ${nameOrId}`);
    }
    return null;
  }
}