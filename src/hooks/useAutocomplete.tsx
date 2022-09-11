import { useMemo } from "react"
import { useServices } from "./useServices"

export const useAutocomplete = (words: string[], prefix: string): string[] => {
    const Autocomplete = useServices('Autocomplete')

    const builtTrie = useMemo(() => {
        return Autocomplete.createTrie(words.map(word => word.toLowerCase()))
    }, [ words, Autocomplete ])

    return Autocomplete.searchTrie(builtTrie, prefix.toLowerCase())
}
