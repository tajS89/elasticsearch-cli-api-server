#!/usr/bin/env node

import { Command } from "commander";
import { version } from "../package.json";
import { commands } from "./utils/commands";
import type { CommandArgs } from "./utils/commands";



async function init() {

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

init()
