describe("AutocompleteList", function() {
  var subject;
  var item1;
  var item2;
  var item3;
  var items;
  beforeEach(function() {
    item1 = { value: 1, text: "Test item 1" };
    item2 = { value: 2, text: "Test item 2" };
    item3 = { value: 3, text: "Test item 3" };
    items = [item1, item2, item3];
    subject = new AutocompleteList({ onItemClick: sinon.spy() });
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

  describe("#initialize", function() {
    it("has an element", function() {
      expect(subject.$el).to.exist;
      expect(subject.$el[0].tagName).to.equal("UL");
      expect(subject.$el).to.have.class("autocomplete-list");
      expect(subject.$el).to.have.class("hidden");
    });
  });

  describe("#render", function() {
    beforeEach(function() {
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
      expect(subject.$el.find("li").length).to.equal(items.length);
    });

    describe("when there are no items", function() {
      beforeEach(function() {
        subject.$el.removeClass("hidden");
        subject.$el.empty();
      });

      it("it adds the hidden class", function() {
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

  describe("#selectedItem", function() {
    beforeEach(function() {
      subject.createListItems(items);
    });

    it("returns undefined when no item is selected", function() {
      expect(subject.selectedItem()).to.be.undefined;
    });

    it("returns the selected item when one is selected", function() {
      var selectedItem = _.first(subject.items);
      selectedItem.select();
      expect(subject.selectedItem()).to.equal(selectedItem);
    });
  });

  describe("#nextItem", function() {
    beforeEach(function() {
      subject.createListItems(items);
    });

    describe("when no items are selected", function() {
      it("returns the first item", function() {
        expect(subject.nextItem()).to.equal(_.first(subject.items));
      });
    });

    describe("when an item is selected", function() {
      beforeEach(function() {
        _.first(subject.items).select();
      });

      it("returns the next item in the items array", function() {
        expect(subject.nextItem()).to.equal(subject.items[1]);
      });
    });

    describe("when the last item is already selected", function() {
      it("returns the first item", function() {
        _.last(subject.items).select();
        expect(subject.nextItem()).to.equal(_.first(subject.items));
      });
    });
  });

  describe("#selectNextItem", function() {
    beforeEach(function() {
      subject.createListItems(items);
    });

    describe("when no items are selected", function() {
      it("selects the first item", function() {
        subject.selectNextItem();
        expect(_.first(subject.items).selected).to.be.true;
      });
    });

    describe("when an item is selected", function() {
      beforeEach(function() {
        _.first(subject.items).select();
        subject.selectNextItem();
      });

      it("selects the next item in the items array", function() {
        expect(subject.items[1].selected).to.be.true;
      });

      it("deselects the previously selected item", function() {
        expect(_.first(subject.items).selected).to.be.false;
      });
    });

    describe("when the last item is already selected", function() {
      it("selects the first item", function() {
        _.last(subject.items).select();
        subject.selectNextItem();
        expect(_.first(subject.items).selected).to.be.true;
      });
    });
  });

  describe("#previousItem", function() {
    beforeEach(function() {
      subject.createListItems(items);
    });

    describe("when no items are selected", function() {
      it("returns the last item", function() {
        expect(subject.previousItem()).to.equal(_.last(subject.items));
      });
    });

    describe("when an item is selected", function() {
      beforeEach(function() {
        _.last(subject.items).select();
      });

      it("returns the next item in the items array", function() {
        expect(subject.previousItem()).to.equal(subject.items[1]);
      });
    });

    describe("when the first item is already selected", function() {
      it("returns the last item", function() {
        _.first(subject.items).select();
        expect(subject.previousItem()).to.equal(_.last(subject.items));
      });
    });
  });

  describe("#selectPreviousItem", function() {
    beforeEach(function() {
      subject.createListItems(items);
    });

    describe("when no items are selected", function() {
      it("selects the last item", function() {
        subject.selectPreviousItem();
        expect(_.last(subject.items).selected).to.be.true;
      });
    });

    describe("when an item is selected", function() {
      beforeEach(function() {
        _.last(subject.items).select();
        subject.selectPreviousItem();
      });

      it("selects the previous item in the items array", function() {
        expect(subject.items[1].selected).to.be.true;
      });

      it("deselects the previously selected item", function() {
        expect(_.last(subject.items).selected).to.be.false;
      });
    });

    describe("when the first item is already selected", function() {
      it("selects the last item", function() {
        _.first(subject.items).select();
        subject.selectPreviousItem();
        expect(_.last(subject.items).selected).to.be.true;
      });
    });
  });
});

