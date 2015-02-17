  function AutocompleteList(attributes) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.attributes = attributes || {};
  _.defaults(this.attributes, {
    onItemSelect: function() { throw new Error("AutocompleteList: onItemSelect is undefined"); }
  });

  this.initialize();
}

AutocompleteList.prototype.initialize = function() {
  this.$el = $("<ul class='autocomplete-list hidden'/>");
};

AutocompleteList.prototype.render = function(items) {
  this.$el.empty();
  if (_.isEmpty(items)) {
    this.hide();
  } else {
    this.createListItems(items);
    this.renderItems();
    this.show();
  }
};

AutocompleteList.prototype.hide = function() {
  this.$el.addClass("hidden");
};

AutocompleteList.prototype.show = function() {
  this.$el.removeClass("hidden");
};

AutocompleteList.prototype.createListItems = function(items) {
  this.items = _.map(items, this.createListItem);
};

AutocompleteList.prototype.createListItem = function(item) {
  return new AutocompleteListItem({ item: item, onSelect: this.handleItemSelect });
};

AutocompleteList.prototype.handleItemSelect = function(item) {
  this.attributes.onItemSelect(item);
  this.hide();
};

AutocompleteList.prototype.renderItems = function() {
  _.each(this.items, this.renderItem);
};

AutocompleteList.prototype.renderItem = function(item) {
  this.$el.append(item.$el);
};

AutocompleteList.prototype.activeItem = function() {
  return _.find(this.items, "active");
};

AutocompleteList.prototype.nextItem = function() {
  var nextIndex = _.indexOf(this.items, this.activeItem()) + 1;
  var nextItem = this.items[nextIndex] || _.first(this.items);
  return nextItem;
};

AutocompleteList.prototype.activateNextItem = function() {
  var currentlySelected = this.activeItem();
  this.nextItem().activate();
  if (currentlySelected) {
    currentlySelected.deactivate();
  }
};

AutocompleteList.prototype.previousItem = function() {
  var previousIndex = _.indexOf(this.items, this.activeItem()) - 1;
  var previousItem = this.items[previousIndex] || _.last(this.items);
  return previousItem;
};

AutocompleteList.prototype.activatePreviousItem = function() {
  var currentlySelected = this.activeItem();
  this.previousItem().activate();
  if (currentlySelected) {
    currentlySelected.deactivate();
  }
};

AutocompleteList.prototype.handleCommandEntry = function(command) {
  this["handle" + _.capitalize(command)]();
};

AutocompleteList.prototype.handleDown = function() {
  this.activateNextItem();
};

AutocompleteList.prototype.handleUp = function() {
  this.activatePreviousItem();
};

AutocompleteList.prototype.handleEnter = function() {
  var activeItem = this.activeItem();
  if (activeItem) {
    activeItem.select();
  }
};

AutocompleteList.prototype.handleEscape = function() {
  this.hide();
};
