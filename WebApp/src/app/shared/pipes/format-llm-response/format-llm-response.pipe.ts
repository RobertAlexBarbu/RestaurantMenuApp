import { inject, Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Pipe({
    name: 'formatLlmResponse',
    standalone: true,
})
export class FormatLlmResponsePipe implements PipeTransform {
    private readonly sanitizer = inject(DomSanitizer)

    transform(text: string): SafeHtml {
        if (!text) return ''

        // Process headings first (since they affect block structure)
        let formattedText = this.processHeadings(text)

        // Process other block elements
        formattedText = this.processCodeBlocks(formattedText)
        formattedText = this.processBlockquotes(formattedText)
        formattedText = this.processHorizontalRules(formattedText)
        formattedText = this.processLists(formattedText)
        formattedText = this.processTables(formattedText)

        // Process inline elements
        formattedText = this.processInlineElements(formattedText)

        return this.sanitizer.bypassSecurityTrustHtml(
            `<div class="prose dark:prose-invert w-full text-on-surface">${formattedText}</div>`,
        )
    }

    private processHeadings(text: string): string {
        return text
            .replace(/^#\s+(.*$)/gm, '<h1 class="text-3xl font-medium mb-4 mt-8">$1</h1>')
            .replace(/^##\s+(.*$)/gm, '<h2 class="text-2xl font-medium mb-3 mt-6">$1</h2>')
            .replace(/^###\s+(.*$)/gm, '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>')
            .replace(/^####\s+(.*$)/gm, '<h4 class="text-md font-medium mb-1 mt-2">$1</h4>')

    }

    private processInlineElements(text: string): string {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            .replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>')
            .replace(/`(.*?)`/g, '<code class="font-mono bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">$1</code>')
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="my-4"><span class="text-sm italic">Image: $1</span></div>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    }

    private processCodeBlocks(text: string): string {
        return text.replace(/```(\w*)\n([\s\S]*?)\n```/g,
            '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm">$2</code></pre>')
    }

    private processBlockquotes(text: string): string {
        return text.replace(/^>\s+(.*$)/gm,
            '<blockquote class="border-l-4 border-gray-300 dark:border-gray-500 pl-4 my-4 text-gray-600 dark:text-gray-300">$1</blockquote>')
    }

    private processHorizontalRules(text: string): string {
        return text.replace(/^---$/gm, '<hr class="my-8 w-full border-gray-200 dark:border-gray-700">')
    }

    private processLists(text: string): string {
        // Process unordered lists
        text = text.replace(/^-\s+(.*$)/gm, '<li class="my-1">$1</li>')
        text = text.replace(/^\*\s+(.*$)/gm, '<li class="my-1">$1</li>')

        // Process ordered lists
        text = text.replace(/^(\d+)\.\s+(.*$)/gm, '<li class="my-1">$2</li>')

        // Wrap lists in their containers
        text = text.replace(/<li class="my-1">.*<\/li>(?:\n<li class="my-1">.*<\/li>)*/g,
            (match) => {
                if (match.startsWith('<li class="my-1">1.')) {
                    return `<ol class="list-decimal pl-8 my-4">${match}</ol>`
                }
                return `<ul class="list-disc pl-8 my-4">${match}</ul>`
            })

        return text
    }

    private processTables(text: string): string {
        return text.replace(/^\|(.+)\|$\n^\|(?:-+)\|$\n((?:^\|.+\|$\n?)+)/gm,
            (match, headers, rows) => {
                const headerCells = headers.split('|')
                    .filter((cell: string) => cell.trim())
                    .map((cell: string) => `<th class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left">${cell.trim()}</th>`)
                    .join('')

                const bodyRows = rows.split('\n')
                    .filter((row: string) => row.trim())
                    .map((row: string) => {
                        const cells = row.split('|')
                            .filter(cell => cell.trim())
                            .map(cell => `<td class="px-4 py-2 border border-gray-300 dark:border-gray-600">${cell.trim()}</td>`)
                            .join('')
                        return `<tr>${cells}</tr>`
                    })
                    .join('')

                return `<div class="overflow-x-auto my-6">
          <table class="min-w-full border-collapse">
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>${headerCells}</tr>
            </thead>
            <tbody>${bodyRows}</tbody>
          </table>
        </div>`
            })
    }

}
