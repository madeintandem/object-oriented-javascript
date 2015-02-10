function Autocomplete(attributes) {
  this.attributes = attributes || {};
  if (_.isUndefined(this.attributes.selector)) throw new Error("Autocomplete: selector is undefined");

  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.setupInput(this.attributes.selector);
  this.items = this.attributes.items || [];
  this.$el = this.$input.parent();
  this.completionList = new AutocompleteList;
  this.autocompleteInput = new AutocompleteInput({
    name: this.$input.attr("name"),
    value: this.$input.val(),
    onTextEntry: this.handleTextEntry,
    onCommandEntry: this.handleCommandEntry
  });
  this.render();
}

Autocomplete.prototype.setupInput = function(selector) {
  this.$input = $(selector);
  this.$input.wrap("<div class='autocomplete-container' />");
  this.$input.hide();
};

Autocomplete.prototype.render = function() {
  this.$el.append(this.autocompleteInput.$el);
  this.$el.append(this.completionList.$el);
};

Autocomplete.prototype.setFilter = function(text) {
  this.filter = text ? new RegExp("^" + text, "i") : null;
};

Autocomplete.prototype.handleTextEntry = function(text) {
  this.setFilter(text);
  this.completionList.render(this.filteredItems());
};

Autocomplete.prototype.handleCommandEntry = function(command) {
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

Autocomplete.prototype.itemMatchesFilter = function(item) {
  return this.filter ? !!item.text.match(this.filter) : false;
};

Autocomplete.prototype.filteredItems = function() {
  return this.filter ? _.filter(this.items, this.itemMatchesFilter) : [];
};
