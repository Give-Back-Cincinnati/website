const config = {
    schemaFile: `https://api.givebackcincinnati.org/docs/swagger.json`,
    apiFile: './apiSlice.ts',
    apiImport: 'apiSlice',
    outputFile: './openApi.ts',
    exportName: 'openApi',
    hooks: true
}

module.exports = config