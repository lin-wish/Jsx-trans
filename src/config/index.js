const basicConfig = {
    selectionStyle: "text",
    highlightActiveLine: true,
    highlightSelectedWord: true,
    readOnly: false,
    cursorStyle: "ace",
    theme: "solarized_dark"
}

export const getConfig = {
    'html': Object.assign({}, basicConfig, {
        mode: 'ace/mode/html'
    }),
    'jsx': Object.assign({}, basicConfig, {
        mode: 'ace/mode/jsx'
    })
}