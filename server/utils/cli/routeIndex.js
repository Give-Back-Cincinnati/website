const fs = require('fs')

module.exports = function () {
    const routes = fs.readdirSync('./src/routes/')
    .filter(route => route != 'index.ts' && !route.includes('test'))
    .map(route => route.replace('.ts', ''))
    .sort()

    return `import express from 'express'
${
    routes
        .map(route => 'import ' + route + ' from \'./' + route + '\'')
        .join('\n')
}

export const app = express()

app.use(express.json())

${
    routes
        .map(route => 'app.use(\'/' + route.toLowerCase() + '\', ' + route + ')')
        .join('\n')
}
`
}
