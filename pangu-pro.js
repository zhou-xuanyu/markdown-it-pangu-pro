export default function markdownItPanguPro(md, options = {}) {
    const width = options.width ?? "0.25em";
    const GAP = `<span style="display:inline-block;width:${width};"></span>`;
    const CJK = '一-鿿㐀-䶿豈-﫿぀-ゟ゠-ヿ';
    const LATIN = 'A-Za-z0-9';
    const pattern = new RegExp(`([${CJK}]) ?([${LATIN}])|([${LATIN}]) ?([${CJK}])`, "g");

    function cjkSpacing(state) {
        for (const block of state.tokens) {
            if (block.type === "inline") {
                const next = [];
                for (const child of block.children) {
                    if (child.type === "text") {
                        pattern.lastIndex = 0;
                        let lastIndex = 0;
                        let match;
                        while ((match = pattern.exec(child.content)) !== null) {
                            const firstChar = match[1] || match[3];
                            const secondChar = match[2] || match[4];
                            const beforeText = child.content.slice(lastIndex, match.index + firstChar.length);
                            if (beforeText) {
                                const t = new state.Token("text", "", 0);
                                t.content = beforeText;
                                next.push(t);
                            }
                            const gap = new state.Token("html_inline", "", 0);
                            gap.content = GAP;
                            next.push(gap);
                            lastIndex = match.index + match[0].length - secondChar.length;
                            pattern.lastIndex = lastIndex;
                        }
                        if (lastIndex === 0) {
                            next.push(child);
                        } else if (lastIndex < child.content.length) {
                            const t = new state.Token("text", "", 0);
                            t.content = child.content.slice(lastIndex);
                            next.push(t);
                        }
                    } else {
                        next.push(child);
                    }
                }
                block.children = next;
            }
        }
    }

    md.core.ruler.push("cjk_spacing", cjkSpacing);
}
