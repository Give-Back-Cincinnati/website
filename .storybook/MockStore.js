import { createStore } from '../src/store'
import { Provider } from 'react-redux'

export const MockStore = ({ children, state }) => (
    <Provider
        store={createStore(state)}
    >
        { children }
    </Provider>
)