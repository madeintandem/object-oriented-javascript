function AutocompleteLocalAdapter(attributes) {
  this.attributes = attributes || {};
  if (_.isUndefined(this.attributes.items)) throw new Error("AutocompleteLocalAdapter: items is undefined");
  if (_.isUndefined(this.attributes.onAutocomplete)) throw new Error("AutocompleteLocalAdapter: onAutocomplete is undefined");
  _.bindAll.apply(this, [this].concat(_.functions(this)));
}

AutocompleteLocalAdapter.prototype.handleTextEntry = function(text) {
  var items = [];
  if (text) {
    this.filter = new RegExp("^" + text, "i");
    items = _.filter(this.attributes.items, this.itemMatchesFilter);
  }
  this.attributes.onAutocomplete(items);
};

AutocompleteLocalAdapter.prototype.itemMatchesFilter = function(item) {
  return item.text.match(this.filter);
};
