const readline = require('readline')
const fs = require('fs')

const entityTemplate = require('./entityTemplate')
const entityTestTemplate = require('./entityTestTemplate')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const ansiColors = (text, color) => {
    const colors = {
        'green': 32,
        'blue': 34,
        'yellow': 33   
    }
    if (colors[color]) `\x1b[${colors[color]}m${text}\x1b[0m`
    //default for colors not included
    return `\x1b[32m${text}\x1b[0m`
}

const questions = [
    "What would you like to call this entity?"
]

let i = 0
function askQuestion () {
    rl.question(`${questions[i]} `, (line) => {
        switch (i) {
            case 0:
                const entityName = line.trim().replace(/\s/i, '_')
                try {
                    fs.readdirSync('./src/entities')
                } catch (e) {
                    fs.mkdirSync('./src/entities')
                }

                fs.writeFileSync(`./src/entities/${entityName}.ts`, entityTemplate(entityName))
                fs.writeFileSync(`./src/entities/${entityName}.test.ts`, entityTestTemplate(entityName))
                break;
            default:
                return
        }

        i++
        if (questions[i]) {
            askQuestion()
        } else {
            rl.close()
        }
    })
}

askQuestion()

rl.on('close', () => {
    process.exit()
})
