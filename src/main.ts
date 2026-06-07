import { CatalogoPokemon } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

async function main(): Promise<void> {
  const catalogo = new CatalogoPokemon();
  const controller = new TerminalController(catalogo);
  await controller.executarFluxoDemo();
}

main();