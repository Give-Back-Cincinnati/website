class Node {
    val: string | undefined
    children: Record<string, Node>

    constructor (letter?: string, children?: Record<string, Node>) {
        this.val = letter
        this.children = children || {}
    }

    addWord (word: string) {
        if (word === null) {
            return
        }
        let firstChar = word[0]
        let child = this.getChild(firstChar)
        if (!child) {
            child = new Node(firstChar)
            this.children[firstChar] = child
        }
        if (word.length > 1) {
            child.addWord(word.substring(1))
        }
    }

    getChild (letter: string): Node | undefined {
        return this.children[letter]
    }

    getChildren (): Record<string, Node> {
        return this.children
    }

    numChildren (): number {
        return Object.keys(this.children).length
    }
}

export class Trie {

    root: Node

    constructor (words: string[]) {
        this.root = new Node()

        for(let i = 0; i < words.length; i++) {
            this.root.addWord(words[i])
        }
    }

    find (prefix: string | string[]): Node | undefined {
        if (typeof prefix === 'string') prefix = prefix.split('')
        let currentNode: Node | undefined = this.root.children[prefix[0]]
        for(let i = 1; i < prefix.length; i++) {
            if (currentNode) {
                currentNode = currentNode.children[prefix[i]]
            }
        }
        return currentNode
    }

    contains (word: string | string[]): boolean {
        if (typeof word === 'string') word = word.split('')
        let currentNode = this.root.getChild(word[0])
        for (let i = 1; i < word.length; i++) {
            if (!currentNode) {
                return false
            }
            currentNode = currentNode.getChild(word[i])
        }
        return true
    }

    suggestionRec (node: Node, word: string): string {
        for (let a in node.getChildren()) {
            return this.suggestionRec(node.getChildren()[a], word + a)
        }
        return word
    }

    getFullWords (prefix: string): string[] {
        const prefixRoot = this.find(prefix)

        if (!prefixRoot) return []
        if (prefixRoot.numChildren() === 0) return [prefix]

        let foundWords: string[] = []

        for (let a in prefixRoot.getChildren()) {
            foundWords.push(this.suggestionRec(prefixRoot.getChildren()[a], prefix + a))
        }
        
        return foundWords
    }

}
