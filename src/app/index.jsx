import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme.default';
import store from './store';

import Home from './home';
import Task from '../module/task';
import TaskList from '../module/task/task-list';
import Upload from '../module/upload';
import Login from '../module/user/login';

const App = () => (
  <Provider {...store} >
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/bulkUpload" component={Upload} />
          <Route path="/timingTasks" component={TaskList} />
          <Route path="/editor" component={Task} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
