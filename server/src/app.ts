import http from 'http'
import { config, logger } from './config'
import express from 'express'

export const app = express()

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val: string | number) {
    let desiredPort = val
    if (typeof val === "string") {
        desiredPort = parseInt(val, 10)
    }

    if (Number.isNaN(desiredPort)) {
        // named pipe
        return val
    }

    if (desiredPort >= 0) {
        // port number
        return desiredPort
    }

    return false
}

const port = normalizePort(config.port || '3000')
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

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

export const server = http.createServer(app)

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
    const addr = server.address()
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr?.port}`
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
