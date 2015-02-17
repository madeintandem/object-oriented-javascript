describe("AutocompleteListItem", function() {
  var subject;
  var testText;
  var testValue;

  beforeEach(function() {
    testText = "Test Item";
    testValue = 1;
    subject = new AutocompleteListItem({ item: { value: testValue, text: testText }});
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

  it("has a active state", function() {
    expect(subject.active).to.be.false;
  });

  describe("#activate", function() {
    beforeEach(function() {
      subject.activate();
    });

    it("sets active to true", function() {
      expect(subject.active).to.be.true;
    });

    it("adds the active class to el", function() {
      expect(subject.$el).to.have.class("active");
    });
  });

  describe("#deactivate", function() {
    beforeEach(function() {
      subject.active = true;
      subject.$el.addClass("active");
      subject.deactivate();
    });

    it("sets active to false", function() {
      expect(subject.active).to.be.false;
    });

    it("removes the active class from el", function() {
      expect(subject.$el).to.not.have.class("active");
    });
  });

  describe("#select", function() {
    describe("defaults", function() {
      it("raises an error", function() {
        expect(function() {
          subject.select();
        }).to.throw(/onSelect is undefined/);
      });
    });

    describe("specified", function() {
      var called;

      beforeEach(function() {
        called = false;
        subject = new AutocompleteListItem({
          item: {
            value: "",
            text: ""
          },
          onSelect: function() { called = true }
        });
        subject.select();
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
        item: {
          value: "",
          text: ""
        },
        onSelect: function() { called = true; }
      });
      subject.$el.trigger("click");
    });

    it("handles click", function() {
      expect(called).to.be.true;
    });
  });
});
