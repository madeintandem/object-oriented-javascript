describe("AutocompleteList", function() {
  var subject;
  var item1;
  var item2;
  var items;
  beforeEach(function() {
    subject = new AutocompleteList({ onItemClick: sinon.spy() });
  });

  it("has an element", function() {
    expect(subject.$el).to.exist;
    expect(subject.$el[0].tagName).to.equal("UL");
  });

  it("it has a autocomplete-list class", function() {
    expect(subject.$el).to.have.class("autocomplete-list");
  });

  it("is hidden by default", function() {
    expect(subject.$el).to.have.class("hidden");
  });

  it("requires an onItemClick option", function() {
    subject = new AutocompleteList;
    expect(function() {
      subject.attributes.onItemClick();
    }).to.throw("AutocompleteList: onItemClick is undefined");
  });

  it("has attributes", function() {
    expect(subject.attributes).to.have.key("onItemClick");
  });

  describe("#hide", function() {
    it("adds the hidden class to the element", function() {
      subject.$el.removeClass("hidden");
      subject.hide();
      expect(subject.$el).to.have.class("hidden");
    });
  });

  describe("#show", function() {
    it("removes the hidden class from the element", function() {
      subject.$el.addClass("hidden");
      subject.show();
      expect(subject.$el).not.to.have.class("hidden");
    });
  });

  describe("#render", function() {
    var items;
    beforeEach(function() {
      item1 = { value: 1, text: "Test item 1" };
      item2 = { value: 2, text: "Test item 2" };
      items = [item1, item2];
      subject.render(items);
    });

    it("creates an completionListItem for each item", function() {
      expect(subject.items).to.be.an("Array");
      expect(subject.items.length).to.equal(items.length);
      _.each(subject.items, function(item) {
        expect(item).to.be.an.instanceof(AutocompleteListItem);
      });
    });

    it("appends each item to the element", function() {
      expect(subject.$el).to.have.descendants("li");
    });

    it("removes the hidden class", function() {
      expect(subject.$el).not.to.have.class("hidden");
    });

    it("does not double render the items", function() {
      subject.render(items);
      expect(subject.$el.find("li").length).to.equal(2);
    });

    describe("when there are no items", function() {
      beforeEach(function() {
        subject.$el.empty();
      });

      it("it does not remove the hidden class", function() {
        subject.render([]);
        expect(subject.$el).to.have.class("hidden");
      });

      it("does not throw an error when items are undefined", function() {
        expect(function() {
          subject.render();
        }).not.to.throw();
      });
    });
  });

  describe("#handleItemClick", function() {
    var clickedItem;
    beforeEach(function() {
      subject.render(items);
      subject.show();
      clickedItem = _.first(subject.items);
      subject.handleItemClick(clickedItem);
    });

    it("calls the onItemClick callback, passing the item clicked", function() {
      expect(subject.attributes.onItemClick).to.have.been.calledWith(clickedItem);
    });

    it("hides the completion list", function() {
      expect(subject.$el).to.have.class("hidden");
    });
  });
});

