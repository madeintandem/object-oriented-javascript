function AutocompleteInput(name, value, options) {
  if (_.isUndefined(name)) throw new Error("AutocompleteInput: name is undefined");
  if (_.isUndefined(value)) throw new Error("AutocompleteInput: value is undefined");
  this.options = options || {};
  _.defaults(this.options, {
    onTextEntry: function() { throw new Error("AutocompleteInput: onTextEntry is undefined"); },
    onCommand: function() { throw new Error("AutocompleteInput: onCommand is undefined"); }
  });
  this.name = name;
  this.value = value;
  this.$el = $(this.template({
    name: this.name,
    value: this.value
  }));
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
    this.options.onCommand(command);
  } else {
    this.options.onTextEntry(this.$el.val());
  }
};

AutocompleteInput.prototype.isCommandKey = function(keyCode) {
  return _.contains(AutocompleteInput.CMD_KEYCODES, keyCode);
};
