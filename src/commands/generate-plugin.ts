import path from "path";
import inquirer from "inquirer";

import fs from "fs";

import { displayHeader, displayRule, getFilesFromDir } from "../utils";
import { paramCase, pascalCase } from "change-case";
import { createFileFromTemplate } from "../template";

interface Answers {
  name: string;
  type: "menu" | "editor";
}

export const generatePlugin = async (): Promise<void> => {
  await displayHeader();
  await displayRule();

  console.log("");

  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Plugin name",
        validate: (input: string) => {
          return input.includes(" ") ? "Plugin name must be 1 word" : true;
        },
      },
      {
        type: "list",
        name: "type",
        message: "Plugin type",
        choices: ["menu", "editor"],
      },
    ])
    .then((answers: Answers) => {
      const rootPath: string = path.join(
        __dirname,
        "../",
        "../",
        "templates",
        "plugin"
      );

      getFilesFromDir(rootPath)
        .then((files) => {
          const model = {
            className: pascalCase(answers.name),
            type: {
              menu: answers.type === "menu",
              editor: answers.type === "editor",
            },
            tagName: paramCase(answers.name),
          };

          fs.mkdirSync(path.join(process.cwd(), "generated"));

          Promise.all(
            files.map((file) =>
              createFileFromTemplate(
                {
                  input: file,
                  output: path.join(
                    process.cwd(),
                    "generated",
                    path.relative(rootPath, file)
                  ),
                },
                model
              )
            )
          )
            .then(() => {
              console.log("Done Writing");
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error("err", err);
        });
    });
};
