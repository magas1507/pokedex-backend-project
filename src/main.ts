import { PokemonCatalog } from "./services/BoxServices";
import { TerminalController } from "./controllers/TerminalControllers";

async function main(): Promise<void> {
  const catalog = new PokemonCatalog();
  const controller = new TerminalController(catalog);
  await controller.executeFlowDemo();
}

main();