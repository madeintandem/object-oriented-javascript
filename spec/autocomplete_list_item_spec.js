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

  it("has a template", function() {
    expect(subject.template).to.exist;
    expect(subject.template).to.be.a.function;
    expect(subject.template({ text: testText })).to.match(/<li.+<\/li>/);
  });

  it("has a value", function() {
    expect(subject.value).to.equal(testValue);
  });

  it("has text", function() {
    expect(subject.text).to.equal(testText);
  });

});
