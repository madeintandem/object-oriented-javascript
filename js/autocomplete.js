function Autocomplete(attributes) {
  attributes = attributes || {};
  if (_.isUndefined(attributes.selector)) throw new Error("Autocomplete: selector is undefined");
  if (_.isUndefined(attributes.items || attributes.url)) throw new Error("Autocomplete: items or url is undefined");
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.initialize(attributes.selector, attributes.items || attributes.url);
}

Autocomplete.prototype.initialize = function(selector, itemsOrUrl) {
  this.setupInput(selector);
  this.createAdapter(itemsOrUrl);
  this.$el = this.$input.parent();
  this.completionList = new AutocompleteList;
  this.autocompleteInput = new AutocompleteInput({
    name: this.$input.attr("name"),
    value: this.$input.val(),
    onTextEntry: this.adapter.handleTextEntry,
    onCommandEntry: this.handleCommandEntry
  });
  this.render();
};

Autocomplete.prototype.setupInput = function(selector) {
  this.$input = $(selector);
  this.$input.wrap("<div class='autocomplete-container' />");
  this.$input.hide();
};

Autocomplete.prototype.createAdapter = function(itemsOrUrl) {
  if (_.isArray(itemsOrUrl)) {
    this.adapter = new AutocompleteLocalAdapter({
      items: itemsOrUrl,
      onAutocomplete: this.handleAutocomplete
    });
  } else {
    this.adapter = new AutocompleteAjaxAdapter({
      url: itemsOrUrl,
      onAutocomplete: this.handleAutocomplete
    });
  }
};

Autocomplete.prototype.handleAutocomplete = function(items) {
  this.completionList.render(items);
};

Autocomplete.prototype.render = function() {
  this.$el.append(this.autocompleteInput.$el);
  this.$el.append(this.completionList.$el);
};

Autocomplete.prototype.handleCommandEntry = function(command) {
  this["handle" + _.capitalize(command)]();
};

Autocomplete.prototype.handleDown = function() {
  this.completionList.selectNextItem();
};

Autocomplete.prototype.handleUp = function() {
  this.completionList.selectPreviousItem();
};

Autocomplete.prototype.handleEnter = function() {
  console.log("enter");
};

Autocomplete.prototype.handleEscape = function() {
  console.log("escape");
};
