import appType from './home/store';
import { dataBaseType, tableFieldType, taskTreeType } from './slider/store';
import tabsType from './tabs/store';
import prestoType from './header/store';
import { queryResultType, queryType, taskPostType, frequencyType, timingTaskType } from '../module/task/store';
import userType, { userListType } from '../module/user/store';

const store = {
  app: appType.create(),
  database: dataBaseType.create(),
  tableField: tableFieldType.create(),
  taskTree: taskTreeType.create(),
  tabs: tabsType.create(),
  presto: prestoType.create(),
  query: queryType.create(),
  queryResult: queryResultType.create(),
  taskPost: taskPostType.create(),
  user: userType.create(),
  userList: userListType.create(),
  frequency: frequencyType.create(),
  timingTask: timingTaskType.create(),
  registerModule: function registerModule(name, mod) {
    this[name] = mod;
  }
};

export default store;
