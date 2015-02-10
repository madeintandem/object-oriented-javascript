describe("Autocomplete", function() {
  var subject;
  var items;
  beforeEach(function() {
    appendFixture("input", { id: "autocomplete", type: "text", name: "autocomplete" });
    items = [
      { value: 1, text: "Test item 1" },
      { value: 2, text: "Test item 2" },
      { value: 3, text: "Test item 3" }
    ];
    subject = new Autocomplete({
      selector: "#autocomplete",
      items: items
    });
  });

  it("requires a selector", function() {
    expect(function() {
      new Autocomplete;
    }).to.throw("Autocomplete: selector is undefined");
  });

  it("has a reference to the input", function() {
    expect(subject.$input).to.exist;
    expect(subject.$input).to.have.id("autocomplete");
    expect(subject.$input[0].tagName).to.equal("INPUT");
  });

  it("wraps the element in an .autocomplete-container", function() {
    expect(subject.$el).to.exist;
    expect(subject.$el).to.have.class("autocomplete-container");
  });

  it("hides the original input", function() {
    expect(subject.$input).not.to.be.visible;
  });

  it("creates a filter input", function() {
    expect(subject.autocompleteInput).to.be.an.instanceof(AutocompleteInput);
  });

  it("creates a list for autocompleted items", function() {
    expect(subject.completionList).to.be.an.instanceof(AutocompleteList);
  });

  it("has items", function() {
    expect(subject.items).to.be.an("Array");
    expect(subject.items).to.equal(items);
  });

  it("has an empty items array by default", function() {
    subject = new Autocomplete({ selector: "#autocomplete" });
    expect(subject.items).to.be.an("Array");
    expect(subject.items).to.be.empty;
  });

  describe("#filteredItems", function() {
    describe("when filter is present", function() {
      xit("only returns items that match the filter", function() {
        subject.filter = /Test item 1/i;
        expect(subject.filteredItems()).to.have.lengthOf(1);
      });
    });

    describe("when filter is absent", function() {
      xit("returns no items", function() {
        subject.filter = null;
        expect(subject.filteredItems()).to.have.lengthOf(0);
      });
    });
  });

  describe("#setFilter", function() {
    describe("with input value", function() {
      it("sets the filter based on the input", function() {
        subject.setFilter("test value 1");
        expect("Test Value 1").to.match(subject.filter);
        expect("Test Value 2").not.to.match(subject.filter);
      });
    });

    describe("no input value", function() {
      it("sets the filter to null", function() {
        subject.setFilter("");
        expect(subject.filter).to.be.null;
      });
    });
  });

  describe("#handleCommandEntry", function() {
    beforeEach(function() {
      sinon.spy(subject, "handleUp");
      sinon.spy(subject, "handleDown");
      sinon.spy(subject, "handleEnter");
      sinon.spy(subject, "handleEscape");
    });

    describe("up", function() {
      beforeEach(function() {
        subject.handleCommandEntry("up");
      });

      it("handles up", function() {
        expect(subject.handleUp).to.have.been.called;
        expect(subject.handleDown).to.not.have.been.called;
        expect(subject.handleEnter).to.not.have.been.called;
        expect(subject.handleEscape).to.not.have.been.called;
      });
    });

    describe("down", function() {
      beforeEach(function() {
        subject.handleCommandEntry("down");
      });

      it("handles down", function() {
        expect(subject.handleDown).to.have.been.called;
        expect(subject.handleUp).to.not.have.been.called;
        expect(subject.handleEnter).to.not.have.been.called;
        expect(subject.handleEscape).to.not.have.been.called;
      });
    });

    describe("enter", function() {
      beforeEach(function() {
        subject.handleCommandEntry("enter");
      });

      it("handles enter", function() {
        expect(subject.handleEnter).to.have.been.called;
        expect(subject.handleUp).to.not.have.been.called;
        expect(subject.handleDown).to.not.have.been.called;
        expect(subject.handleEscape).to.not.have.been.called;
      });
    });

    describe("escape", function() {
      beforeEach(function() {
        subject.handleCommandEntry("escape");
      });

      it("handles escape", function() {
        expect(subject.handleEscape).to.have.been.called;
        expect(subject.handleUp).to.not.have.been.called;
        expect(subject.handleDown).to.not.have.been.called;
        expect(subject.handleEnter).to.not.have.been.called;
      });
    });
  });

  describe("#handleTextEntry", function() {
    beforeEach(function() {
      subject.handleTextEntry("test");
    });

    it("sets the filter", function() {
      expect(subject.filter).to.exist;
    });

    xit("renders the completion list", function() {
      expect(subject.completionList.$el).to.have.descendants("li");
    });
  });
});
