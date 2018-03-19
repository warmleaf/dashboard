import React from 'react';
import { observer, inject } from 'mobx-react';
import AceEditor from 'react-ace';

import 'brace/mode/sql';
import 'brace/theme/xcode';
import 'brace/ext/language_tools';

const SqlEditor = ({ tabId, query, ...rest }) => (<AceEditor
  {...rest}
  style={{ width: '100%', height: '100%' }}
  setOptions={{
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 2
  }}
  value={query.getQueries(tabId)}
  mode="sql"
  theme="xcode"
  onChange={(data) => { query.updateQuery(tabId, data); }}
  onSelectionChange={(editor) => {
    const range = editor.getRange();
    const lines = editor.doc.$lines;
    let selectedText = null;

    if (range.start.row === range.end.row) {
      selectedText = lines[range.start.row].substring(range.start.column, range.end.column);
    } else {
      selectedText = lines[range.start.row].substring(range.start.column);
      lines.map((line, index) => {
        if (index > range.start.row && index < range.end.row) {
          selectedText += line;
        }
        return true;
      });
      console.log(lines[range.end.row])
      selectedText += lines[range.end.row].substring(0, range.end.column);
    }

    query.selectQuery(tabId, selectedText);
  }}
  name="UNIQUE_ID_OF_DIV"
  editorProps={{ $blockScrolling: true }}
/>);

export default inject(s => ({
  tabId: s.APP.nowTab,
  query: s.QUERY
}))(observer(SqlEditor));

