export default {
  tab: {},
  active: {},
  first: {},
  init: function init(origin, tabs) {
    this.tab[origin] = tabs;
  },
  addTab: function addTab(origin, owner, rel) {
    if (!this.tab[origin]) {
      this.tab[origin] = new Map();
    }
    if (this.tab[origin].has(owner)) return;
    this.tab[origin].set(owner, rel);

    if (this.tab[origin].size === 1) {
      this.first[origin] = {
        owner,
        props: rel
      };
      this.active[origin] = owner;
    }

    if (rel.active) {
      if (this.tab[origin].size > 1 && this.tab[origin].get(this.active[origin]).active) {
        throw Error(`tab with owner: ${this.active[origin]} is already set active`);
      }
      this.active[origin] = owner;
    }
  },
  toggle: function toggle(origin, owner, state) {
    this.tab[origin].get(owner).active = state || !this.tab[origin].get(owner).active;
    if (!this.active[origin]) {
      this.active[origin] = owner;
    } else if (this.active[origin] !== owner) {
      this.active[origin] = owner;
      const nowActiveOwner = this.active[origin];
      this.tab[origin].get(nowActiveOwner).active = false;
    }
  }
};
