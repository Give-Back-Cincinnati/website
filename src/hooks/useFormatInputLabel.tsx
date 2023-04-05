import { useMemo } from 'react'

export const useFormatInputLabel = ({ label, name }: { label?: JSX.Element | string, name: string }) => {
    return useMemo(() => {
        if (typeof label === 'object') return label
        return (label || name).replace(/([A-Z])/g, ' $1');
    }, [label, name])
}

export default useFormatInputLabel