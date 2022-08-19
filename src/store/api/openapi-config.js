const config = {
    schemaFile: 'http://localhost:3001/docs/swagger.json',
    apiFile: './apiSlice.ts',
    apiImport: 'apiSlice',
    outputFile: './openApi.ts',
    exportName: 'openApi',
    hooks: true
}

module.exports = config