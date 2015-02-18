function AutocompleteListItem(attributes) {
  _.bindAll(this);
  this.attributes = attributes || {};

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

_.merge(AutocompleteListItem.prototype, {

  template: _.template('<li class="autocomplete-list-item"><a href="#"><%= text %></a></li>'),

  registerEvents: function() {
    this.$el.on("click", this.select);
  },

  select: function() {
    this.attributes.onSelect(this);
  },

  activate: function() {
    this.active = true;
    this.$el.addClass("active");
  },

  deactivate: function() {
    this.active = false;
    this.$el.removeClass("active");
  }

});
