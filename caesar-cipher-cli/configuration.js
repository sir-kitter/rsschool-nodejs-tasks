const fs = require('fs')
const commander = require('commander')

const program = new commander.Command()

let action
program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .option('-a, --action <encode/decode>', 'Action encode/decode. This option is mandatory.')
    .action(options => {
        console.log(options.action)
        if (options.action && ['encode', 'decode'].includes(options.action)) {
            action = options.action
        }
    })
    .option('-s, --shift <0...25>', `Specifies shift. This option is mandatory.`)
    .option('-i, --input <filepath>', 'Specifies input file. If this option is missing, then stdin is used as an input source.')
    .option('-o, --output <filepath>', 'Specifies output file. If this option is missing, then stdout is used as an output destination.')
    .helpOption('-h, --help', 'Display help.')

program.parse(process.argv)

const options = program.opts();

if(!action || !['encode', 'decode'].includes(action)) {
    throw new Error('Specify action as suggested:\n' + program.helpInformation())
}

const shift = Number.parseInt(options.shift)
if(!options.shift || isNaN(shift) || shift > 25 || shift < 0) {
    throw new Error('Specify shift as suggested:\n' + program.helpInformation())
}

let input = process.stdin
if(options.input) {
    const custom_input = fs.openSync(options.input, 'r')
    if(!custom_input) {
        throw new Error(`Unable to open ${options.input}.`)
    }
    input = fs.createReadStream(null, {fd: custom_input})
}

let output = process.stdout
if(options.output) {
    const custom_output = fs.openSync(options.output, 'a+')
    if(!custom_output) {
        throw new Error(`Unable to open ${options.output}`)
    }
    output = fs.createWriteStream(null, {fd: custom_output})
}

const configuration = {
    shift:  shift,
    action: action,
    input:  input,
    output: output,
}

module.exports = configuration