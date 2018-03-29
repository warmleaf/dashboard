import { types, getSnapshot, applySnapshot } from 'mobx-state-tree';
import { sliderPaneWidth, outPutPaneHeight } from '../../config';

const {
  model, number, maybe, string, enumeration, union, optional
} = types;

const localStore = window.localStorage;

const PopupStateType = model({
  id: maybe(union(string, number)),
  name: maybe(union(string, number))
});

const AppType = model({
  popup: optional(string, 'close'),
  popupState: optional(PopupStateType, {}),
  sliderPaneWidth: optional(number, localStore.getItem('sliderPaneWidth') || sliderPaneWidth),
  outPutPaneHeight: optional(number, localStore.getItem('outPutPaneHeight') || outPutPaneHeight),
  state: optional(enumeration('state', [
    'pending',
    'loading',
    'done',
    'error',
    'success',
    'warning',
    'info',
    'initial'
  ]), 'initial'),
  message: maybe(string)
}).actions(self => ({

  stateChange(state) {
    self.state = state;
  },

  setMessage(message) {
    self.message = message;
  },

  popupOpen(id, state) {
    console.log(id, state);
    if (self.popup !== id) { self.popup = id; }
    self.popupState = state;
  },

  popupClose(id) {
    if (self.popup === id) { self.popup = 'close'; }
  },

  updateBySnapshot(key, snapshot) {
    applySnapshot(self[key], snapshot);
  }
})).views(self => ({
  getSnapshot(key) {
    return getSnapshot(self[key]);
  }
}));

export default AppType;
