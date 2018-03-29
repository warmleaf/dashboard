import React from 'react';
import propTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { observer, inject } from 'mobx-react';

const TableContext = ({
  getQueries,
  selectQuery,
  updateQuery,
  execQuery,
  popupOpen,
  tabId,
  ...rest
}) =>
  (
    <ContextMenu hideOnLeave id="table_context" className="table-contextmenu" {...rest}>
      <MenuItem onClick={(e, { node, parentNode }) => {
        let sql = '';
        const SQL = `SELECT * FROM ${parentNode.title}.${node.title} LIMIT 100;`;
        const cacheSql = getQueries(tabId);
        if (cacheSql === '' || cacheSql === undefined) {
          sql = SQL;
        } else {
          sql = `${cacheSql}${cacheSql.substr(-1, 1) === ';' ? '' : ';'}\n${SQL}`;
        }
        updateQuery(tabId, sql);
        selectQuery(tabId, SQL);
        execQuery(100);
      }}
      >
        select…limit 100
      </MenuItem>
      <MenuItem onClick={(e, { node, parentNode }) => {
        let sql = '';
        const SQL = `SELECT * FROM ${parentNode.title}.${node.title} LIMIT 100;`;
        const cacheSql = getQueries(tabId);
        if (cacheSql === '' || cacheSql === undefined) {
          sql = SQL;
        } else {
          sql = `${cacheSql}${cacheSql.substr(-1, 1) === ';' ? '' : ';'}\n${SQL}`;
        }
        updateQuery(tabId, sql);
      }}
      >
        select…limit 100（no execute）
      </MenuItem>
      <MenuItem onClick={(e, { node, parentNode }) => {
        let sql = '';
        const SQL = `SELECT COUNT(*) FROM ${parentNode.title}.${node.title};`;
        const cacheSql = getQueries(tabId);
        if (cacheSql === '' || cacheSql === undefined) {
          sql = SQL;
        } else {
          sql = `${cacheSql}${cacheSql.substr(-1, 1) === ';' ? '' : ';'}\n${SQL}`;
        }
        updateQuery(tabId, sql);
        selectQuery(tabId, SQL);
        execQuery(100);
      }}
      >
        select count（*）
      </MenuItem>
      <MenuItem onClick={(e, { node, parentNode }) => {
        let sql = '';
        const SQL = `SELECT COUNT(*) FROM ${parentNode.title}.${node.title};`;
        const cacheSql = getQueries(tabId);
        if (cacheSql === '' || cacheSql === undefined) {
          sql = SQL;
        } else {
          sql = `${cacheSql}${cacheSql.substr(-1, 1) === ';' ? '' : ';'}\n${SQL}`;
        }
        updateQuery(tabId, sql);
      }}
      >
        select count（*）（no execute）
      </MenuItem>
      <MenuItem onClick={(e, { node, parentNode }) => {
        let sql = '';
        const SQL = `SHOW CREATE TABLE ${parentNode.title}.${node.title};`;
        const cacheSql = getQueries(tabId);
        if (cacheSql === '' || cacheSql === undefined) {
          sql = SQL;
        } else {
          sql = `${cacheSql}${cacheSql.substr(-1, 1) === ';' ? '' : ';'}\n${SQL}`;
        }
        updateQuery(tabId, sql);
        selectQuery(tabId, SQL);
        execQuery(100);
      }}
      >
        show create table
      </MenuItem>
      <MenuItem onClick={(e, { node, parentNode }) => {
        let sql = '';
        const SQL = `SELECT * FROM ${parentNode.title}.${node.title} LIMIT 100;`;
        const cacheSql = getQueries(tabId);
        if (cacheSql === '' || cacheSql === undefined) {
          sql = SQL;
        } else {
          sql = `${cacheSql}${cacheSql.substr(-1, 1) === ';' ? '' : ';'}\n${SQL}`;
        }
        updateQuery(tabId, sql);
        selectQuery(tabId, SQL);
        execQuery(100);
      }}
      >
        show view ddl
      </MenuItem>
      <MenuItem onClick={(e, { node, parentNode }) => {
        let sql = '';
        const SQL = `DESCRIBE ${parentNode.title}.${node.title};`;
        const cacheSql = getQueries(tabId);
        if (cacheSql === '' || cacheSql === undefined) {
          sql = SQL;
        } else {
          sql = `${cacheSql}${cacheSql.substr(-1, 1) === ';' ? '' : ';'}\n${SQL}`;
        }
        updateQuery(tabId, sql);
        selectQuery(tabId, SQL);
        execQuery(100);
      }}
      >
        describe
      </MenuItem>
      <MenuItem onClick={(e, { node }) => {
        popupOpen('recover', { id: node.name });
      }}
      >
        recover
      </MenuItem>
    </ContextMenu>
  );

TableContext.propTypes = {
  getQueries: propTypes.func.isRequired,
  selectQuery: propTypes.func.isRequired,
  updateQuery: propTypes.func.isRequired,
  execQuery: propTypes.func.isRequired,
  popupOpen: propTypes.func.isRequired,
  tabId: propTypes.string.isRequired
};

export default inject(s => ({
  getQueries: s.query.getQueries,
  selectQuery: s.query.selectQuery,
  execQuery: s.query.execQuery,
  updateQuery: s.query.updateQuery,
  popupOpen: s.app.popupOpen,
  tabId: s.tabs.activeTabId
}))(observer(TableContext));
