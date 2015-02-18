function AutocompleteAjaxAdapter(attributes) {
  _.bindAll(this);
  this.attributes = attributes || {};
  if (_.isUndefined(this.attributes.url)) throw new Error("AutocompleteAjaxAdapter: url is undefined");
  if (_.isUndefined(this.attributes.onAutocomplete)) throw new Error("AutocompleteAjaxAdapter: onAutocomplete is undefined");
  this.throttleDelay = 250;
}

_.merge(AutocompleteAjaxAdapter.prototype, {

  handleTextEntry: function(text) {
    this.query = text;
    if (this.queuedRequest) {
      clearTimeout(this.queuedRequest);
    }
    if (!text) {
      this.attributes.onAutocomplete([]);
      return;
    }
    this.queueRequest();
  },

  fetchItems: function() {
    $.ajax({
      url: this.attributes.url,
      type: "get",
      dataType: "json",
      data: { query: this.query }
    })
      .done(this.attributes.onAutocomplete);
  },

  queueRequest: function() {
    var _this = this;
    this.queuedRequest = setTimeout(function() {
      _this.fetchItems();
    }, this.throttleDelay);
  }

});

