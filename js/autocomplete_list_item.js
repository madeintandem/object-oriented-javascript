function AutocompleteListItem(attributes) {
  this.attributes = attributes || {};
  _.bindAll.apply(this, [this].concat(_.functions(this)));

  this.value = attributes.item.value;
  this.text = attributes.item.text;
  _.defaults(this.attributes, {
    onSelect: function() { throw new Error("AutocompleteListItem: onSelect is undefined"); }
  });
  this.$el = $(this.template({
    value: this.value,
    text: this.text
  }));
  this.active = false;

  this.registerEvents();
}

AutocompleteListItem.prototype.template = _.template('<li class="autocomplete-list-item"><a href="#"><%= text %></a></li>');

AutocompleteListItem.prototype.registerEvents = function() {
  this.$el.on("click", this.select);
};

AutocompleteListItem.prototype.select = function() {
  this.attributes.onSelect(this);
};

AutocompleteListItem.prototype.activate = function() {
  this.active = true;
  this.$el.addClass("active");
};

AutocompleteListItem.prototype.deactivate = function() {
  this.active = false;
  this.$el.removeClass("active");
};
