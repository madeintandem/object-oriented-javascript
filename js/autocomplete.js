function Autocomplete(selector, items) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.createListItems(items);
  this.$input = $(selector);
  this.$input.wrap("<div class='autocomplete-container' />");
  this.$input.addClass("autocomplete-input");
  this.$el = this.$input.parent();
  this.$el.append(_.template('<input name="<%= name %>" class="autocomplete-filter-input" value="<%= value %>" />', {
    name: this.$input.attr("name") + "_filter_input",
    value: this.$input.val()
  }));
  this.$filterInput = this.$el.find(".autocomplete-filter-input");
  this.$input.hide();
  this.$el.append("<ul class='autocomplete-list'/>");
  this.$completionList = this.$el.find(".autocomplete-list");
  this.filter = this.setFilter();

  this.registerEvents();
}

Autocomplete.KEYCODES = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  backspace: 8,
  esc: 27,
  enter: 13
};

Autocomplete.prototype.registerEvents = function() {
  this.$filterInput.on("keyup", this.handleInputKeydown);
};

Autocomplete.prototype.createListItem = function(item) {
  return new AutocompleteListItem(item, { onClick: this.handleItemClick });
};

Autocomplete.prototype.createListItems = function(items) {
  this.items = _.map(items, this.createListItem);
};

Autocomplete.prototype.renderItem = function(item) {
  this.$completionList.append(item.$el);
};

Autocomplete.prototype.render = function() {
  this.$completionList.empty();
  this.$completionList.show();
  _.each(this.filteredItems(), this.renderItem);
};

Autocomplete.prototype.setFilter = function() {
  this.filter = this.$filterInput.val() ? new RegExp("^" + this.$filterInput.val(), "i") : null;
};

Autocomplete.prototype.handleInputKeydown = function(evnt) {
  console.log(evnt.keyCode);
  console.log(this.getKey(evnt.keyCode));
  this.setFilter();
  this.render();
};

Autocomplete.prototype.getKey = function(keyCode) {
  return _.reduce(Autocomplete.KEYCODES, function(memo, code, key) {
    if (code === keyCode) memo = key;
    return memo;
  }, undefined);
};

Autocomplete.prototype.handleItemClick = function(item) {
  this.$input.val(item.text);
  this.$completionList.hide();
  console.log(this.$input.val());
};

Autocomplete.prototype.itemMatchesFilter = function(item) {
  return this.filter ? !!item.text.match(this.filter) : false;
};

Autocomplete.prototype.filteredItems = function() {
  return _.where(this.items, this.itemMatchesFilter);
};
