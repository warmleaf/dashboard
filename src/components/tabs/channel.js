import Channel from '@storybook/channels';

class LocalMessage {
  constructor() {
    this._handler = null;
  }

  send(event) {
    this._handler(event);
  }

  setHandler(handler) {
    this._handler = handler;
  }
}

export default new Channel({
  transport: new LocalMessage()
});
