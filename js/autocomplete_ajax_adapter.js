function AutocompleteAjaxAdapter(attributes) {
  this.attributes = attributes || {};
  if (_.isUndefined(this.attributes.url)) throw new Error("AutocompleteAjaxAdapter: url is undefined");
  if (_.isUndefined(this.attributes.onAutocomplete)) throw new Error("AutocompleteAjaxAdapter: onAutocomplete is undefined");
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.throttleDelay = 250;
}

AutocompleteAjaxAdapter.prototype.handleTextEntry = function(text) {
  this.query = text;
  if (this.queuedRequest) {
    clearTimeout(this.queuedRequest);
  }
  if (!text) {
    this.attributes.onAutocomplete([]);
    return;
  }
  this.queueRequest();
};

AutocompleteAjaxAdapter.prototype.fetchItems = function() {
  $.ajax({
    url: this.attributes.url,
    type: "get",
    dataType: "json",
    data: { query: this.query }
  })
    .done(this.attributes.onAutocomplete);
};

AutocompleteAjaxAdapter.prototype.queueRequest = function() {
  var _this = this;
  this.queuedRequest = setTimeout(function() {
    _this.fetchItems();
  }, this.throttleDelay);
};

