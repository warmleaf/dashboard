const store = {
  registerModule: function registerModule(name, mod) {
    this[name] = mod;
  }
};

export default store;
