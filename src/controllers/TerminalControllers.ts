import { searchPokemon } from "../services/PokeApiService";
import { PokemonCatalog } from "../services/BoxServices"
import { formatHeader } from "../utils/textFormatters";

export class TerminalController {
  private catalog: PokemonCatalog;

  constructor(catalog: PokemonCatalog) {
    this.catalog = catalog;
  }

  public async executeFlowDemo(): Promise<void> {
    console.log(formatHeader("Pokédex TypeScript Lite"));

    console.log("\n[1] Buscando e adicionando Pokémons...\n");
    const pikachu = await searchPokemon("pikachu");
    if (pikachu) this.catalog.addPokemon(pikachu);

    const charmander = await searchPokemon("charmander");
    if (charmander) this.catalog.addPokemon(charmander);

    const bulbasaur = await searchPokemon("bulbasaur");
    if (bulbasaur) this.catalog.addPokemon(bulbasaur);

    console.log("\n[2] Testando duplicidade...\n");
    const pikachuDuplicado = await searchPokemon("pikachu");
    if (pikachuDuplicado) this.catalog.addPokemon(pikachuDuplicado);

    console.log("\n[3] Buscando Pokémon inexistente...\n");
    await searchPokemon("pokemon-inexistente");

    console.log("\n[4] Listando catálogo:");
    this.catalog.listPokemon();

    console.log(`\n[5] Estatísticas:`);
    console.log(`    Total: ${this.catalog.total()}`);
    console.log(`    Peso total: ${this.catalog.calculateTotalWeight()}`);
    console.log(`    Todos têm nome: ${this.catalog.allHasName()}`);

    console.log("\n[6] Removendo Pikachu (ID 25)...\n");
    this.catalog.remover(25);

    console.log("\n[7] Catálogo após remoção:");
    this.catalog.listPokemon();

    console.log(formatHeader("Execução concluída!"));
  }
}