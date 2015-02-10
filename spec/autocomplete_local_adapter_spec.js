describe("AutocompleteLocalAdapter", function() {
  var subject;
  var items;
  beforeEach(function() {
    items = [
      { value: 1, text: "Test item 1" },
      { value: 2, text: "Test item 2" },
      { value: 3, text: "Test item 3" }
    ];
    subject = new AutocompleteLocalAdapter({
      items: items,
      onAutocomplete: sinon.spy()
    });
  });

  it("requires items", function() {
    expect(function() {
      new AutocompleteLocalAdapter;
    }).to.throw("AutocompleteLocalAdapter: items is undefined");
  });

  it("requires an onAutocomplete callback", function() {
    expect(function() {
      new AutocompleteLocalAdapter({ items: items, onTextEntry: sinon.spy() });
    }).to.throw("AutocompleteLocalAdapter: onAutocomplete is undefined");
  });

  describe("#handleTextEntry", function() {
    describe("when empty text is passed", function() {
      it("calls the onAutocomplete callback, passing an empty array of items", function() {
        subject.handleTextEntry("");
        expect(subject.attributes.onAutocomplete).to.have.been.calledWith([]);
      });
    });

    describe("when text is passed", function() {
      beforeEach(function() {
        subject.handleTextEntry("Test item 3");
      });

      it("calls the onAutocomplete callback, passing an array of matching items", function() {
        expect(subject.attributes.onAutocomplete).to.have.been.calledWith([_.last(items)]);
      });
    });
  });
});
