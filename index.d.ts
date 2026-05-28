import MarkdownIt from "markdown-it";

export interface PanguProOptions {
    width?: string;
}

export default function markdownItPanguPro(md: MarkdownIt, options?: PanguProOptions): void;
