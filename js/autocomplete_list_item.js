function AutocompleteListItem(attributes) {
  this.attributes = attributes || {};
  _.bindAll.apply(this, [this].concat(_.functions(this)));

  this.value = this.attributes.value;
  this.text = this.attributes.text;
  _.defaults(this.attributes, {
    onClick: function() { throw new Error("AutocompleteListItem: onClick is undefined"); }
  });
  this.$el = $(this.template({
    value: this.attributes.value,
    text: this.attributes.text
  }));
  this.selected = false;

  this.registerEvents();
}

AutocompleteListItem.prototype.template = _.template('<li class="autocomplete-list-item"><a href="#"><%= text %></a></li>');

AutocompleteListItem.prototype.registerEvents = function() {
  this.$el.on("click", this.handleClick);
};

AutocompleteListItem.prototype.handleClick = function() {
  this.attributes.onClick(this);
};

AutocompleteListItem.prototype.select = function() {
  this.selected = true;
  this.$el.addClass("selected");
};

AutocompleteListItem.prototype.deselect = function() {
  this.selected = false;
  this.$el.removeClass("selected");
};
