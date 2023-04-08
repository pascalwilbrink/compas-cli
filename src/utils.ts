import fs from "fs";
import path from "path";

import figlet from "figlet";
import chalk from "chalk";

export const displayHeader = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    figlet.text(
      "OSCD",
      {
        font: "4Max",
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        console.log(chalk.blue(data));
        return resolve();
      }
    );
  });
};

export const displayRule = (): void => {
  console.log(chalk.green("============================="));
};

export const getFilesFromDir = (dir: string): Promise<string[]> => {
  const walk = (
    dir: string,
    done: (err: Error | null, result?: string[]) => void
  ) => {
    let result: string[] = [];
    fs.readdir(dir, (err: NodeJS.ErrnoException | null, list: string[]) => {
      if (err) return done(err);
      let pending = list.length;
      if (!pending) {
        return done(null, result);
      }
      list.forEach((file) => {
        file = path.resolve(dir, file);
        fs.stat(file, (err: NodeJS.ErrnoException | null, res: fs.Stats) => {
          if (res.isDirectory()) {
            walk(file, (err: Error | null, res: string[] | undefined) => {
              if (res) {
                result = result.concat(res);
              }
              if (!--pending) {
                done(null, result);
              }
            });
          }
          if (res.isFile()) {
            result.push(file);
            if (!--pending) done(null, result);
          }
        });
      });
    });
  };

  return new Promise((resolve, reject) => {
    walk(dir, (err: Error | null, result: string[] | undefined) => {
      return err ? reject(err) : resolve(result!);
    });
  });
};
