function AutocompleteListItem(data, options) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.options = options || {};
  _.defaults(this.options, {
    onClick: function() { throw new Error("AutocompleteListItem: onClick is undefined"); }
  });
  this.template = _.template('<li class="autocomplete-list-item"><a href="#"><%= text %></a></li>');
  this.$el = $(this.template(data));
  this.value = data.value;
  this.text = data.text;
  this.onClick = options.onClick;

  this.registerEvents();
}

AutocompleteListItem.prototype.registerEvents = function() {
  this.$el.on("click", this.handleClick);
};

AutocompleteListItem.prototype.handleClick = function() {
  this.options.onClick(this);
};
