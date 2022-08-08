import type { Store } from "@reduxjs/toolkit"
import { AppDispatch } from "store"

export interface IToasterService {
    notify (title: string, body?: string): void
}

export class ToasterService implements IToasterService {

    // private store: Store
    // private dispatch: AppDispatch

    constructor () {
        // this.store = store
        // this.dispatch = store.dispatch
        return this
    }
    // constructor (store: Store) {
    //     // this.store = store
    //     // this.dispatch = store.dispatch
    //     return this
    // }

    notify (title: string, body: string) {
        // this.dispatch()
    }

}
