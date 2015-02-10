function AutocompleteAjaxAdapter(attributes) {
  this.attributes = attributes || {};
  if (_.isUndefined(this.attributes.url)) throw new Error("AutocompleteAjaxAdapter: url is undefined");
  if (_.isUndefined(this.attributes.onAutocomplete)) throw new Error("AutocompleteAjaxAdapter: onAutocomplete is undefined");
  _.bindAll.apply(this, [this].concat(_.functions(this)));
}

AutocompleteAjaxAdapter.prototype.handleTextEntry = function(text) {
  $.ajax({
    url: this.attributes.url,
    type: "get",
    dataType: "json",
    data: { query: text }
  })
    .done(this.attributes.onAutocomplete);
};
