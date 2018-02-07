import { types } from 'mobx-state-tree';

const {
  model, number, maybe, string, array, map
} = types;

export const UIParameter = model({
  sliderWidth: maybe(number),
  outPaneHeight: maybe(number)
});

export const AppType = model({
  tabs: array(string)
}).actions(self => ({
  newTab() {
    const lastIndex = self.tabs[self.tabs.length - 1].split('$')[1];
    self.tabs.push(`tmp$${Number(lastIndex) + 1}`);
  }
}));

const AppStore = AppType.create({
  tabs: ['tmp$1']
});

export default AppStore;
