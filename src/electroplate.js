#! /usr/bin/env node
import fs from 'fs'
import ora from 'ora'
import path from 'path'
import program from 'commander'
import electronForge from 'electron-forge'

program
  .version(require('../package.json').version)
  .option("-u, --url <url>", "url to electroplate")
  .option("-i, --icon <icon>", "icon for package")
  .option("-n, --name <name>", "name of app")
  .parse(process.argv)

async function main() {
  const spinner = ora(`Electroplating ${program.name || ""}`).start();

  if (!fs.existsSync('./out')) {
    fs.mkdirSync("./out")
  }

  await electronForge.init({
    template: "electroplate",
    dir: path.resolve("./out"),
  })

  spinner.succeed()

  const config = {
    url: program.url
  }
  const productName = program.name || "electroplated-app"
  const packageJSON = require(path.resolve("out", "package.json"));
  packageJSON.config.forge.electronPackagerConfig.icon = program.icon;
  packageJSON.name = productName;
  packageJSON.productName = productName;
  fs.writeFileSync(path.resolve("out", "package.json"), JSON.stringify(packageJSON))
  fs.writeFileSync(path.resolve("out", "config.json"), JSON.stringify(config))

  await electronForge.package({dir: path.resolve("out")})
}
main();
