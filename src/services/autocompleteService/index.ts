import { Trie } from "./trie"

export class AutocompleteService {

    createTrie (libraryArr: string[]): Trie {
        return new Trie(libraryArr)
    }

    searchTrie (trie: Trie, searchFor: string): string[] {
        return trie.getFullWords(searchFor)
    }

}