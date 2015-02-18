function AutocompleteList(attributes) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.attributes = attributes || {};
  _.defaults(this.attributes, {
    onItemSelect: function() { throw new Error("AutocompleteList: onItemSelect is undefined"); }
  });

  this.initialize();
}

_.merge(AutocompleteList.prototype, {

  initialize: function() {
    this.$el = $("<ul class='autocomplete-list hidden'/>");
  },

  render: function(items) {
    this.$el.empty();
    if (_.isEmpty(items)) {
      this.hide();
    } else {
      this.createListItems(items);
      this.renderItems();
      this.show();
    }
  },

  hide: function() {
    this.$el.addClass("hidden");
  },

  show: function() {
    this.$el.removeClass("hidden");
  },

  createListItems: function(items) {
    this.items = _.map(items, this.createListItem);
  },

  createListItem: function(item) {
    return new AutocompleteListItem({ item: item, onSelect: this.handleItemSelect });
  },

  handleItemSelect: function(item) {
    this.attributes.onItemSelect(item);
    this.hide();
  },

  renderItems: function() {
    _.each(this.items, this.renderItem);
  },

  renderItem: function(item) {
    this.$el.append(item.$el);
  },

  activeItem: function() {
    return _.find(this.items, "active");
  },

  nextItem: function() {
    var nextIndex = _.indexOf(this.items, this.activeItem()) + 1;
    var nextItem = this.items[nextIndex] || _.first(this.items);
    return nextItem;
  },

  activateNextItem: function() {
    var currentlySelected = this.activeItem();
    this.nextItem().activate();
    if (currentlySelected) {
      currentlySelected.deactivate();
    }
  },

  previousItem: function() {
    var previousIndex = _.indexOf(this.items, this.activeItem()) - 1;
    var previousItem = this.items[previousIndex] || _.last(this.items);
    return previousItem;
  },

  activatePreviousItem: function() {
    var currentlySelected = this.activeItem();
    this.previousItem().activate();
    if (currentlySelected) {
      currentlySelected.deactivate();
    }
  },

  handleCommandEntry: function(command) {
    this["handle" + _.capitalize(command)]();
  },

  handleDown: function() {
    this.activateNextItem();
  },

  handleUp: function() {
    this.activatePreviousItem();
  },

  handleEnter: function() {
    var activeItem = this.activeItem();
    if (activeItem) {
      activeItem.select();
    }
  },

  handleEscape: function() {
    this.hide();
  }

});
