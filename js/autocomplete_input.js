function AutocompleteInput(attributes) {
  this.attributes = attributes || {};
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  if (_.isUndefined(this.attributes.name)) throw new Error("AutocompleteInput: name is undefined");
  if (_.isUndefined(this.attributes.value)) throw new Error("AutocompleteInput: value is undefined");

  _.defaults(this.attributes, {
    onTextEntry: function() { throw new Error("AutocompleteInput: onTextEntry is undefined"); },
    onCommandEntry: function() { throw new Error("AutocompleteInput: onCommandEntry is undefined"); }
  });

  this.name = this.attributes.name + "_autocomplete_input";
  this.value = this.attributes.value;
  this.$el = $(this.template({
    name: this.name,
    value: this.value || ""
  }));
  this.$el.on("keyup", this.handleKeyup);
}

AutocompleteInput.CMD_KEYCODES = {
  up: 38,
  down: 40,
  escape: 27,
  enter: 13
};

AutocompleteInput.CMD_KEYCODES = _.merge(AutocompleteInput.CMD_KEYCODES, _.invert(AutocompleteInput.CMD_KEYCODES));

AutocompleteInput.prototype.template = _.template("<input name='<%= name %>' class='autocomplete-input' value='<%= value %>' />");

AutocompleteInput.prototype.handleKeyup = function(evnt) {
  if (this.isCommandKey(evnt.keyCode)) {
    var command = AutocompleteInput.CMD_KEYCODES[evnt.keyCode];
    this.attributes.onCommandEntry(command);
  } else {
    this.attributes.onTextEntry(this.$el.val());
  }
};

AutocompleteInput.prototype.isCommandKey = function(keyCode) {
  return _.contains(AutocompleteInput.CMD_KEYCODES, keyCode);
};
