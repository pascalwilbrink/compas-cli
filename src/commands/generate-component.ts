import inquirer from "inquirer";

import { displayHeader, displayRule } from "../utils";

export const generateComponent = async (): Promise<void> => {
  await displayHeader();
  await displayRule();
  console.log("");

  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Component selector",
      validate: (input: string) => {
        return input.includes("-") ? true : "Selector must include a `-`";
      },
    },
  ]);
};
