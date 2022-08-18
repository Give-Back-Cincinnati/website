import { AlertProps } from "@/components/Utils"
import { EnhancedStore } from "@reduxjs/toolkit"
import { AppDispatch, RootState, Actions } from "store"

export interface IToasterService {
    notify ({ title, body, intent }: AlertProps): void
}

export class ToasterService implements IToasterService {
    private actions: Actions
    private dispatch: AppDispatch

    constructor (store: EnhancedStore<RootState>, actions: Actions) {
        this.actions = actions
        this.dispatch = store.dispatch as AppDispatch
        return this
    }

    notify (alertProps: AlertProps) {
        this.dispatch(this.actions.toaster.notify(alertProps))
        setTimeout(() => {
            this.dispatch(this.actions.toaster.remove())
        }, 5000)
    }

}
