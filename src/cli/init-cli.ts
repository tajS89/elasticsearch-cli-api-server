#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { Command } from "commander";
import { commands } from "./commands";
import type { CommandArgs } from "./commands";

const rootDir = process.cwd();
const { version } = JSON.parse(readFileSync(`${rootDir}/package.json`, "utf8"));

export const init = () => {
  const program: Command = new Command();
  program.name("esh");
  program.description("Elastic search helper CLI");
  program.version(version, "--version", "output the current version");

  commands.forEach((t: CommandArgs) => {
    const programObj = new Command();
    programObj.name(t.command).description(t.description);
    if (t.options) {
      t.options.map((item) => {
        return item.required
          ? programObj.requiredOption(item.flag, item.description)
          : programObj.option(item.flag, item.description);
      });
    }
    programObj.action(t.action);
    program.addCommand(programObj);
  });
  program.parse();
}

if (require.main === module) {
  init();
}