import React, { Component } from 'react';
import { getConfig } from '../config/index';
import HTMLtoJSX from 'htmltojsx';
import ReactDOMServer from 'react-dom/server';
import ace from 'brace';
import 'brace/mode/html';
import 'brace/mode/jsx';
import 'brace/theme/solarized_dark';

export default class Converter extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._setUpHtmlEditor();
        this._setUpJsxEditor();

        let htmlToJsx = new HTMLtoJSX({
            createClass: true,
            outputClassName: 'AwesomeComponent'
        })
        this._html2jsx = htmlToJsx.convert;
        this._jsx2html = ReactDOMServer.renderToStaticMarkup

        this.emptyLineRegex = /^(?=\n)$|^\s*|\s*$|\n\n+/gm;
    }

    _setUpHtmlEditor = () => {
        this.htmlEditor = ace.edit('html-editor');
        this.htmlEditor.setOptions(getConfig['html']);
        this.htmlEditor.getSession().on('change', this._convertHtmlToJsx);
    }

    _setUpJsxEditor = () => {
        this.jsxEditor = ace.edit('jsx-editor');
        this.jsxEditor.setOptions(getConfig['jsx']);
        this.jsxEditor.getSession().on('change', this._convertJsxToHtml);
    }

    _convertHtmlToJsx = () => {
        let html = this.htmlEditor.getValue();
        html = html.replace(this.emptyLineRegex, '');
        const jsx = this._html2jsx(html);
        this.jsxEditor.setValue(jsx, -1);
    }

    _convertJsxToHtml = () => {
        let jsx = this.jsxEditor.getValue();
        jsx = jsx.replace(this.emptyLineRegex, '');
        const html = this._jsx2html(jsx);
        this.htmlEditor.setValue(html, -1);
    }

    render() {
        return (
            <div className="row">
                <div className="box-container">
                    <h2>Html</h2>
                    <div id="html-editor" className="editor"></div>
                </div>

                <div className="box-container">
                    <h2>Jsx</h2>
                    <div id="jsx-editor" className="editor"></div>
                </div>

            </div>
        );

    }
}
