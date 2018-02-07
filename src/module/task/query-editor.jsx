import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { Controlled as CodeMirror } from 'react-codemirror2';

export default class QueryEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'select * from `tabs`'
    };
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: 'text/x-mariadb',
      extraKeys: { 'Ctrl-Q': 'autocomplete' },
      completeSingle: false,
      gutters: ['CodeMirror-lint-markers']
    };
    return (
      <CodeMirror
        value={this.state.value}
        options={options}
        editorDidMount={(editor) => {
          // editor.setSize(300, 200);
        }}
        onBeforeChange={(editor, data, value) => {
          this.setState({ value });
        }}
        onChange={(editor, data, value) => {
          editor.showHint();
        }}
      />
    );
  }
}
