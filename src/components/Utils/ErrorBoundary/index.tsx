import React, { ReactElement } from 'react'

type Props = {
    children: ReactElement
    message?: string
}

type State = {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props)
        this.state = {
            hasError: false
         }
    }

    static getDerivedStateFromError (error: Error) {
        return { hasError: true, errorMessage: error.message }
    }

    componentDidCatch (error: Error, errorInfo: unknown) {
        // log errors here...
    }

    render () {
        if (this.state.hasError) {
            return <h2>Error: { this.props.message || 'An unknown error occurred' }</h2>
        }
        return this.props.children
    }
}