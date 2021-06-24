import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTableOfContents from 'markdown-it-table-of-contents'
import MarkdownItImageFigures from 'markdown-it-image-figures'
import uslug from 'uslug'
const uslugify = (s) => uslug(s)

export default ({ app }, inject) => {

    const md = new MarkdownIt({
        injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
        breaks: true, // 改行コードを<br>に変換する
        html: true, // HTML タグを有効にする
        linkify: true, // URLに似たテキストをリンクに自動変換する
        typography: true  // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    })

    md.use(MarkdownItAnchor, {
        slugify: uslugify
    })
    md.use(MarkdownItTableOfContents)  // 追加
    md.use(MarkdownItImageFigures, {
        figcaption: true,
        dataType: true,
        tabindex: true
    })

    const defaultRender = (md.renderer.rules.image && md.renderer.rules.link_open) || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
    }

    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        tokens[idx].attrPush(["loading", "lazy"]);
        return defaultRender(tokens, idx, options, env, self);
    };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const aIndex = tokens[idx].attrIndex('target')
        if (tokens[idx]['attrs'][0][1].match('http')) {
            if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank'])
            } else {
                tokens[idx].attrs[aIndex][1] = '_blank'
            }
        }

        const relIndex = tokens[idx].attrIndex("rel");
        if (relIndex < 0) {
            tokens[idx].attrPush(["rel", "noopener"]);
        } else {
            tokens[idx].attrs[relIndex][1] = "noopener";
        }

        return defaultRender(tokens, idx, options, env, self);
    }

    inject('md', md)
}