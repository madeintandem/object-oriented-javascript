  function AutocompleteList(attributes) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.attributes = attributes || {};
  _.defaults(this.attributes, {
    onItemClick: function() { throw new Error("AutocompleteList: onItemClick is undefined"); }
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
  return new AutocompleteListItem(item, { onClick: this.handleItemClick });
};

AutocompleteList.prototype.handleItemClick = function(item) {
  this.attributes.onItemClick(item);
  this.hide();
};

AutocompleteList.prototype.renderItems = function() {
  _.each(this.items, this.renderItem);
};

AutocompleteList.prototype.renderItem = function(item) {
  this.$el.append(item.$el);
};

AutocompleteList.prototype.selectedItem = function() {
  return _.find(this.items, "selected");
};

AutocompleteList.prototype.nextItem = function() {
  var nextIndex = _.indexOf(this.items, this.selectedItem()) + 1;
  var nextItem = this.items[nextIndex] || _.first(this.items);
  return nextItem;
};

AutocompleteList.prototype.selectNextItem = function() {
  var currentlySelected = this.selectedItem();
  this.nextItem().select();
  if (currentlySelected) currentlySelected.deselect();
};

AutocompleteList.prototype.previousItem = function() {
  var previousIndex = _.indexOf(this.items, this.selectedItem()) - 1;
  var previousItem = this.items[previousIndex] || _.last(this.items);
  return previousItem;
};

AutocompleteList.prototype.selectPreviousItem = function() {
  var currentlySelected = this.selectedItem();
  this.previousItem().select();
  if (currentlySelected) currentlySelected.deselect();
};
