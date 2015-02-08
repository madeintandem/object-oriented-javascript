function AutocompleteListItem(data, options) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.value = data.value;
  this.text = data.text;
  this.options = options || {};
  _.defaults(this.options, {
    onClick: function() { throw new Error("AutocompleteListItem: onClick is undefined"); }
  });
  this.$el = $(this.template(data));
  this.selected = false;

  this.registerEvents();
}

AutocompleteListItem.prototype.template = _.template('<li class="autocomplete-list-item"><a href="#"><%= text %></a></li>');

AutocompleteListItem.prototype.registerEvents = function() {
  this.$el.on("click", this.handleClick);
};

AutocompleteListItem.prototype.handleClick = function() {
  this.options.onClick(this);
};

AutocompleteListItem.prototype.select = function() {
  this.selected = true;
  this.$el.addClass("selected");
};

AutocompleteListItem.prototype.deselect = function() {
  this.selected = false;
  this.$el.removeClass("selected");
};
