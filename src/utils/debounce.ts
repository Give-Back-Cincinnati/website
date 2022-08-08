interface options {
    ms?: number
    leading?: boolean
}

export function debounce(fn: Function, opts = { ms: 300, leading: false } as options) {
    if (opts.ms === undefined) {
        opts.ms = 300
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined
    return function (this: any, ...args: any[]) {

        const invoke = () => fn.apply(this, args)

        if (opts.leading) {
            if (timeoutId === undefined) {
                invoke()
            }
            timeoutId = setTimeout(() => {
                timeoutId = undefined
            }, opts.ms)
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(invoke, opts.ms)
        }

    }
}