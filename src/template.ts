import fs from "fs";
import path from "path";

import { compile } from "handlebars";

export interface FileWithOutput {
  input: string;
  output: string;
}

export const readFile = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      { encoding: "utf-8" },
      (err: NodeJS.ErrnoException | null, data: string) => {
        return err ? reject(err) : resolve(data);
      }
    );
  });
};

export const writeFile = (file: string, data: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const dir: string = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFile(
      file,
      data,
      {
        encoding: "utf-8",
      },
      (err: NodeJS.ErrnoException | null) => {
        return err ? reject(err) : resolve();
      }
    );
  });
};

export const createFileFromTemplate = (
  file: FileWithOutput,
  model: { [key: string]: any }
): Promise<void> => {
  return new Promise((resolve, reject) => {
    readFile(file.input)
      .then((data) =>
        writeFile(
          compile(file.output.replaceAll("<%", "{{").replaceAll("%>", "}}"))(
            model
          ),
          compile(data)(model)
        )
      )
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};
