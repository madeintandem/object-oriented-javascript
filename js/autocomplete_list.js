  function AutocompleteList(attributes) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.attributes = attributes || {};
  _.defaults(this.attributes, {
    onItemClick: function() { throw new Error("AutocompleteList: onItemClick is undefined"); }
  });
  this.$el = $("<ul class='autocomplete-list hidden'/>");
}

AutocompleteList.prototype.hide = function() {
  this.$el.addClass("hidden");
};

AutocompleteList.prototype.show = function() {
  this.$el.removeClass("hidden");
};

AutocompleteList.prototype.render = function(items) {
  this.$el.empty();
  if (_.isEmpty(items)) {
    this.$el.addClass("hidden");
  } else {
    this.createListItems(items);
    this.renderItems();
    this.$el.removeClass("hidden");
  }
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
