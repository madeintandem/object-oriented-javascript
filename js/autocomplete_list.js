function AutocompleteList() {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.$el = $("<ul class='autocomplete-list hidden'/>");
}

AutocompleteList.prototype.hide = function() {
  this.$el.addClass("hidden");
};

AutocompleteList.prototype.show = function() {
  this.$el.removeClass("hidden");
};

AutocompleteList.prototype.render = function(items) {
  if (items && items.length) {
    _.each(items, function(item) {
      this.$el.append(item.$el);
    }, this);
    this.$el.removeClass("hidden");
  } else {
    this.$el.addClass("hidden");
  }
};
