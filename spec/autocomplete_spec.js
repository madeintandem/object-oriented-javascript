describe("Autocomplete", function() {
  var subject;
  beforeEach(function() {
    appendFixture("input", { id: "autocomplete", type: "text", name: "autocomplete" });
    subject = new Autocomplete("#autocomplete");
  });

  it("has a reference to the input", function() {
    expect(subject.$input).to.exist;
    expect(subject.$input).to.have.id("autocomplete");
    expect(subject.$input[0].tagName).to.equal("INPUT");
  });

  it("has a reference to the autocompleteList", function() {
    expect(subject.$completionList).to.exist;
    expect(subject.$completionList).to.have.class("autocomplete-list");
    expect(subject.$completionList[0].tagName).to.equal("UL");
  });

  it("wraps the element in an .autocomplete-container", function() {
    expect(subject.$el).to.have.class("autocomplete-container");
  });

  it("has a reference to the container", function() {
    expect(subject.$el).to.exist;
    expect(subject.$el).to.have.class("autocomplete-container");
  });

  it("renders the autocompleteList", function() {
    expect(subject.$el.find(".autocomplete-list")).to.exist;
  });

  describe("with items", function() {
    var items;
    beforeEach(function() {
      items = [
        { value: 1, text: "Test item 1" },
        { value: 2, text: "Test item 2" }
      ];
      subject = new Autocomplete("#autocomplete", items);
    });

    it("creates an AutocompleteListItem for each item", function() {
      expect(subject.items).to.be.an("Array");
      expect(subject.items.length).to.equal(items.length);
      _.each(subject.items, function(item) {
        expect(item).to.be.an.instanceof(AutocompleteListItem);
      });
    });

    describe("render", function() {
      beforeEach(function() {
        subject.render();
      });

      it("appends each item's $el to the list", function() {
        expect(subject.$completionList.find("li").length).to.equal(items.length);
      });
    });
  });
});
