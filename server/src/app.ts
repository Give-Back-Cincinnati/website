import http from 'http'
import { config, logger } from './config'
import express from 'express'

export const app = express()

const port = config.port
app.set('port', port)

/**
 * Event listener for HTTP server "error" event.
 */

export interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
}

function onError (error: ErrnoException) {
    logger.error(error)
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`)
            process.exit(1)
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`)
            process.exit(1)
        default:
            logger.error(error)
    }
}

export const server = http.createServer(app)

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
    const addr = server.address() as { port: number, address: string, family: string }
    const bind = `port ${addr.port}`
    logger.info(`Listening on ${bind}`)
}

/**
 * Graceful shutdown
 */

const startGracefulShutdown = () => {
    logger.info('Starting graceful shutdown')
    server.close(() => {
        logger.info('Graceful shutdown complete')
        process.exit(0)
    })
}


server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

process.on('SIGTERM', () => {
    logger.error('SIGTERM')
    startGracefulShutdown()
})
process.on('SIGINT', () => {
    logger.error('SIGINT')
    startGracefulShutdown()
})
