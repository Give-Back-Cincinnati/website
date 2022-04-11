export const config = {
    port: process.env.PORT || 3000,
    mongo: {
        // include auth in the mongodb_uri env var
        protocol: process.env.MONGODB_PROTOCOL || 'mongodb',
        host: process.env.MONGODB_HOST || 'mongo',
        username: process.env.MONGODB_USER || undefined,
        password: process.env.MONGODB_PASSWORD || undefined,
        database: process.env.MONGODB_DATABASE || 'index',
        options: {
          readPreference: 'primary',
        },
      },
}

export const logger = console


export default config
