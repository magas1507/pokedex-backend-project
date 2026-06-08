import { PokemonResumo } from "../models/Pokemon";

export function formatPokemon(pokemon: PokemonResumo): string {
  return `#${pokemon.id} - ${pokemon.name} | Tipos: ${pokemon.type.join(", ")} | Altura: ${pokemon.height} | Peso: ${pokemon.weight} | HP: ${pokemon.hp} | Ataque: ${pokemon.attack} | Defesa: ${pokemon.defense}`;
}

export function formatHeader(titulo: string): string {
  return `\n${"=".repeat(50)}\n  ${titulo}\n${"=".repeat(50)}`;
}

export function formatMessage(tipo: "OK" | "ERRO" | "AVISO", texto: string): string {
  return `[${tipo}] ${texto}`;
}