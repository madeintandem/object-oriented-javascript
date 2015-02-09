function Autocomplete(selector, items) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.setupInput(selector);
  this.$el = this.$input.parent();
  this.completionList = new AutocompleteList;
  this.autocompleteInput = new AutocompleteInput(this.$input.attr("name"), this.$input.val());
  this.createListItems(items);
}

Autocomplete.prototype.setupInput = function(selector) {
  this.$input = $(selector);
  this.$input.wrap("<div class='autocomplete-container' />");
  this.$input.hide();
};

Autocomplete.prototype.createListItem = function(item) {
  return new AutocompleteListItem(item, { onClick: this.handleItemClick });
};

Autocomplete.prototype.createListItems = function(items) {
  this.items = _.map(items, this.createListItem);
};

Autocomplete.prototype.setFilter = function(text) {
  this.filter = text ? new RegExp("^" + text, "i") : null;
};

Autocomplete.prototype.handleTextEntry = function(text) {
  this.setFilter(text);
  this.completionList.render(this.filteredItems());
};

Autocomplete.prototype.handleItemClick = function(item) {
  this.$input.val(item.text);
  this.completionList.hide();
};

Autocomplete.prototype.handleCommand = function(command) {
  this["handle" + _.capitalize(command)]();
};

Autocomplete.prototype.handleUp = function() {
  console.log("up");
};

Autocomplete.prototype.handleDown = function() {
};

Autocomplete.prototype.handleEnter = function() {
  console.log("enter");
};

Autocomplete.prototype.handleEscape = function() {
  console.log("escape");
};

Autocomplete.prototype.selectNextItem = function() {
};

Autocomplete.prototype.itemMatchesFilter = function(item) {
  return this.filter ? !!item.text.match(this.filter) : false;
};

Autocomplete.prototype.filteredItems = function() {
  return this.filter ? _.filter(this.items, this.itemMatchesFilter) : [];
};
