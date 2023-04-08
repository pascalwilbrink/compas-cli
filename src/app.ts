import { Argument, Command, program } from "commander";

import { generateComponent } from "./commands/generate-component";
import { generatePlugin } from "./commands/generate-plugin";

const { description, version } = require("../package.json");

program.description(description).version(version, "-v, - version");

const generate: Command = program
  .command("generate")
  .alias("g")
  .addArgument(
    new Argument("<type>", "Object type").choices(["plugin", "component"])
  )
  .description("Generate OSCD object")
  .action((type: "plugin" | "component") => {
    type === "plugin" ? generatePlugin() : generateComponent();
  });

program.addCommand(generate);

program.parse(process.argv);
