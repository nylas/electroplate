import fs from 'fs'
import path from 'path'
import program from 'commander'
import electronForge from 'electron-forge'

program
  .version(require('../package.json').version)
  .usage("<url>")
  .parse(process.argv)

console.log(electronForge)

async function main() {
  if (!fs.existsSync('./out')) {
    fs.mkdirSync("./out")
  }

  await electronForge.init({
    template: "electroplate",
    dir: path.resolve("./out"),
  })
}
main();
