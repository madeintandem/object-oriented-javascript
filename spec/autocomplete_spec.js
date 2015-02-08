describe("Autocomplete", function() {
  var subject;
  var items;
  beforeEach(function() {
    appendFixture("input", { id: "autocomplete", type: "text", name: "autocomplete" });
    items = [
      { value: 1, text: "Test item 1" },
      { value: 2, text: "Test item 2" }
    ];
    subject = new Autocomplete("#autocomplete", items);
  });

  it("has a reference to the input", function() {
    expect(subject.$input).to.exist;
    expect(subject.$input).to.have.id("autocomplete");
    expect(subject.$input[0].tagName).to.equal("INPUT");
  });

  it("adds the autocomplete-input class to the $input", function() {
    expect(subject.$input).to.have.class("autocomplete-input");
  });

  it("wraps the element in an .autocomplete-container", function() {
    expect(subject.$el).to.exist;
    expect(subject.$el).to.have.class("autocomplete-container");
  });

  it("hides the original input", function() {
    expect(subject.$input).not.to.be.visible;
  });

  it("creates a filter input", function() {
    expect(subject.$autocompleteInput).to.exist;
  });

  it("creates a list for autocompleted items", function() {
    expect(subject.$completionList).to.exist;
  });

  it("creates an completionListItem for each item", function() {
    expect(subject.items).to.be.an("Array");
    expect(subject.items.length).to.equal(items.length);
    _.each(subject.items, function(item) {
      expect(item).to.be.an.instanceof(AutocompleteListItem);
    });
  });

  it("has a filter input template", function() {
    expect(subject.filterInputTemplate).to.be.a("function");
    var renderedTemplate = subject.filterInputTemplate({ name: "foo", value: "foo text" });
    expect(renderedTemplate).to.match(/name='foo'/);
    expect(renderedTemplate).to.match(/value='foo text'/);
  });

  describe("#registerEvents", function() {
    it("handles key press events", function() {
      var called = false;
      var spy = function() {
        called = true;
      };
      subject.handleInputKeyup = spy;
      subject.registerEvents();
      subject.$autocompleteInput.trigger("keyup");
      expect(called).to.be.true;
    });
  });

  describe("#render", function() {
    it("appends the list of items that match the filter", function() {
      subject.filter = /.+/;
      subject.render();
      expect(subject.$completionList).to.have.descendants("li");
      expect(subject.$completionList).to.be.visible;
    });
  });

  describe("#filteredItems", function() {
    describe("when filter is present", function() {
      it("only returns items that match the filter", function() {
        subject.filter = /Test item 1/i;
        expect(subject.filteredItems()).to.have.lengthOf(1);
      });
    });

    describe("when filter is absent", function() {
      it("returns no items", function() {
        subject.filter = null;
        expect(subject.filteredItems()).to.have.lengthOf(0);
      });
    });
  });

  describe("#setFilter", function() {
    describe("with input value", function() {
      it("sets the filter based on the input", function() {
        subject.$autocompleteInput.val("test value 1");
        subject.setFilter();
        expect("Test Value 1").to.match(subject.filter);
        expect("Test Value 2").not.to.match(subject.filter);
      });
    });

    describe("no input value", function() {
      it("sets the filter to null", function() {
        subject.$autocompleteInput.val("");
        subject.setFilter();
        expect(subject.filter).to.be.null;
      });
    });
  });

  describe("#handleInputKeyup", function() {
    beforeEach(function() {
      subject.$autocompleteInput.val("test");
      sinon.spy(subject, "handleTextEntry");
      sinon.spy(subject, "handleCommand");
    });

    describe("command", function() {
      beforeEach(function() {
        subject.handleInputKeyup({ keyCode: Autocomplete.COMMAND_KEYCODES["enter"] });
      });

      it("does not handle text entry", function() {
        expect(subject.handleTextEntry).to.not.have.been.called;
      });

      it("does handle commands", function() {
        expect(subject.handleCommand).to.have.been.calledWith(Autocomplete.COMMAND_KEYCODES["enter"]);
      });
    });

    describe("text", function() {
      beforeEach(function() {
        subject.handleInputKeyup({ keyCode: 84 });
      });

      it("handles text entry", function() {
        expect(subject.handleTextEntry).to.have.been.called;
      });

      it("does not handle commands", function() {
        expect(subject.handleCommand).to.not.have.been.called;
      });
    });
  });

  describe("#handleCommand", function() {
    beforeEach(function() {
      sinon.spy(subject, "handleUp");
      sinon.spy(subject, "handleDown");
      sinon.spy(subject, "handleEnter");
      sinon.spy(subject, "handleEscape");
    });

    describe("up", function() {
      beforeEach(function() {
        subject.handleCommand(Autocomplete.COMMAND_KEYCODES["up"]);
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
        subject.handleCommand(Autocomplete.COMMAND_KEYCODES["down"]);
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
        subject.handleCommand(Autocomplete.COMMAND_KEYCODES["enter"]);
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
        subject.handleCommand(Autocomplete.COMMAND_KEYCODES["escape"]);
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
      subject.$autocompleteInput.val("test");
      subject.handleTextEntry();
    });

    it("sets the filter", function() {
      expect(subject.filter).to.exist;
    });

    it("renders", function() {
      expect(subject.$completionList).to.have.descendants("li");
    });
  });

  describe("#handleItemClick", function() {
    beforeEach(function() {
      subject.$autocompleteInput.val("test");
      subject.handleItemClick(_.first(subject.items));
    });

    it("sets the input's value to the text", function() {
      expect(subject.$input).to.have.value("Test item 1");
    });

    it("hides the completion list", function() {
      expect(subject.$completionList).to.not.be.visible;
    });
  });

  describe("command keycode map", function() {
    it("is a map of command keys and their corresponding key codes", function() {
      expect(Autocomplete.COMMAND_KEYCODES.up).to.equal(38);
      expect(Autocomplete.COMMAND_KEYCODES.down).to.equal(40);
      expect(Autocomplete.COMMAND_KEYCODES.escape).to.equal(27);
      expect(Autocomplete.COMMAND_KEYCODES.enter).to.equal(13);

      expect(Autocomplete.COMMAND_KEYCODES[38]).to.equal("up");
      expect(Autocomplete.COMMAND_KEYCODES[40]).to.equal("down");
      expect(Autocomplete.COMMAND_KEYCODES[27]).to.equal("escape");
      expect(Autocomplete.COMMAND_KEYCODES[13]).to.equal("enter");
    });
  });
});
