const config = {
    schemaFile: `${process.env.NEXT_PUBLIC_API_BASE_URL}/docs/swagger.json`,
    apiFile: './apiSlice.ts',
    apiImport: 'apiSlice',
    outputFile: './openApi.ts',
    exportName: 'openApi',
    hooks: true
}

module.exports = config