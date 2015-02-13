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
    subject = new Autocomplete({ selector: "#autocomplete", url: "test" });
  });

  it("requires a selector", function() {
    expect(function() {
      new Autocomplete;
    }).to.throw("Autocomplete: selector is undefined");
  });

  it("requires a url or an items array", function() {
    expect(function() {
      new Autocomplete({ selector: "#autocomplete" });
    }).to.throw("Autocomplete: items or url is undefined");
  });

  describe("initialize", function() {
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

    describe("when items are passed", function() {
      it("has a local adapter", function() {
        subject = new Autocomplete({
          selector: "#autocomplete",
          items: items
        });
        expect(subject.adapter).to.be.an.instanceof(AutocompleteLocalAdapter);
      });
    });
  });

  describe("#render", function() {
    it("appends the autocomplete input to the element", function() {
      expect(subject.$el).to.have.descendants(".autocomplete-input");
    });

    it("appends the autocomplete list to the element", function() {
      expect(subject.$el).to.have.descendants(".autocomplete-list");
    });
  });

  describe("#handleAutocomplete", function() {
    beforeEach(function() {
      subject.handleAutocomplete(items);
    });

    it("renders the completion list", function() {
      expect(subject.completionList.$el).to.have.descendants("li");
    });
  });

  describe("#handleCommandEntry", function() {
    beforeEach(function() {
      sinon.stub(subject, "handleUp");
      sinon.stub(subject, "handleDown");
      sinon.stub(subject, "handleEnter");
      sinon.stub(subject, "handleEscape");
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

  describe("handleDown", function() {
  });
});
