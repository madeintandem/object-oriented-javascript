describe("AutocompleteListItem", function() {
  var subject;
  var testText;
  var testValue;

  beforeEach(function() {
    testText = "Test Item";
    testValue = 1;
    subject = new AutocompleteListItem({ value: testValue, text: testText });
  });

  it("has an element", function() {
    expect(subject.$el).to.exist;
    expect(subject.$el).to.have.class("autocomplete-list-item");
    expect(subject.$el[0].tagName).to.equal("LI");
  });

  it("has a value", function() {
    expect(subject.value).to.equal(testValue);
  });

  it("has text", function() {
    expect(subject.text).to.equal(testText);
  });

  it("has a template", function() {
    expect(subject.template).to.be.a("function");
    var renderedTemplate = subject.template({ text: "foo" });
    expect(renderedTemplate).to.match(/foo/);
  });

  it("has a selected state", function() {
    expect(subject.selected).to.be.false;
  });

  describe("#select", function() {
    beforeEach(function() {
      subject.select();
    });

    it("sets selected to true", function() {
      expect(subject.selected).to.be.true;
    });

    it("adds the selected class to el", function() {
      expect(subject.$el).to.have.class("selected");
    });
  });

  describe("#deselect", function() {
    beforeEach(function() {
      subject.selected = true;
      subject.$el.addClass("selected");
      subject.deselect();
    });

    it("sets selected to false", function() {
      expect(subject.selected).to.be.false;
    });

    it("removes the selected class from el", function() {
      expect(subject.$el).to.not.have.class("selected");
    });
  });

  describe("#handleClick", function() {
    describe("defaults", function() {
      it("raises an error", function() {
        expect(function() {
          subject.handleClick();
        }).to.throw(/onClick is undefined/);
      });
    });

    describe("specified", function() {
      var called;

      beforeEach(function() {
        called = false;
        subject = new AutocompleteListItem({
          value: "",
          text: "",
          onClick: function() { called = true }
        });
        subject.handleClick();
      });

      it("calls the onClick function", function() {
        expect(called).to.be.true;
      });
    });
  });

  describe("#registerEvents", function() {
    var called;
    beforeEach(function() {
      called = false;
      subject = new AutocompleteListItem({
        value: "",
        text: "",
        onClick: function() { called = true; }
      });
      subject.$el.trigger("click");
    });

    it("handles click", function() {
      expect(called).to.be.true;
    });
  });
});
