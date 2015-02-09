describe("AutocompleteInput", function() {
  var subject;
  var name;
  var value;
  var options;
  beforeEach(function() {
    name = "test";
    value = "test value";
    options = {
      onTextEntry: sinon.spy(),
      onCommand: sinon.spy()
    };
    subject = new AutocompleteInput(name, value, options);
  });

  it("requires a name", function() {
    expect(function() {
      new AutocompleteInput;
    }).to.throw("AutocompleteInput: name is undefined");
  });

  it("requires a value", function() {
    expect(function() {
      new AutocompleteInput(name);
    }).to.throw("AutocompleteInput: value is undefined");
  });

  it("has a name", function() {
    expect(subject.name).to.equal(name);
  });

  it("has a value", function() {
    expect(subject.value).to.equal(value);
  });

  it("has an element", function() {
    expect(subject.$el).to.exist;
    expect(subject.$el).to.have.class("autocomplete-input");
    expect(subject.$el).to.have.attr("name", name);
    expect(subject.$el).to.have.attr("value", value);
  });

  it("has a default onTextEntry handler that throws an error", function() {
    subject = new AutocompleteInput(name, value);
    expect(function() {
      subject.options.onTextEntry();
    }).to.throw("AutocompleteInput: onTextEntry is undefined");
  });

  it("has a default onCommand handler that throws an error", function() {
    subject = new AutocompleteInput(name, value);
    expect(function() {
      subject.options.onCommand();
    }).to.throw("AutocompleteInput: onCommand is undefined");
  });

  it("has a command keycodes constant", function() {
    expect(AutocompleteInput.CMD_KEYCODES.up).to.equal(38);
    expect(AutocompleteInput.CMD_KEYCODES.down).to.equal(40);
    expect(AutocompleteInput.CMD_KEYCODES.escape).to.equal(27);
    expect(AutocompleteInput.CMD_KEYCODES.enter).to.equal(13);

    expect(AutocompleteInput.CMD_KEYCODES[38]).to.equal("up");
    expect(AutocompleteInput.CMD_KEYCODES[40]).to.equal("down");
    expect(AutocompleteInput.CMD_KEYCODES[27]).to.equal("escape");
    expect(AutocompleteInput.CMD_KEYCODES[13]).to.equal("enter");
  });

  describe(".template", function() {
    var templateValues;
    var renderedTemplate;
    beforeEach(function() {
      templateValues = {
        name: "test_name",
        value: "test_value"
      };
      renderedTemplate = subject.template(templateValues);
    });

    it("is an input", function() {
      expect(renderedTemplate).to.match(/^\<input/);
    });

    it("has a name parameter", function() {
      expect(renderedTemplate).to.match(/name=\'test_name\'/);
    });

    it("has a value parameter", function() {
      expect(renderedTemplate).to.match(/value=\'test_value\'/);
    });

    it("has an autocomplete-input class", function() {
      expect(renderedTemplate).to.match(/class=\'autocomplete-input\'/);
    });
  });

  describe("#isCommandKey", function() {
    it("returns true when a command keyCode is given", function() {
      expect(subject.isCommandKey(38)).to.be.true;
      expect(subject.isCommandKey(40)).to.be.true;
      expect(subject.isCommandKey(27)).to.be.true;
      expect(subject.isCommandKey(13)).to.be.true;
    });

    it("returns false when a non command keyCode is given", function() {
      expect(subject.isCommandKey(84)).to.be.false;
    });
  });

  describe("#onKeyup", function() {
    describe("command", function() {
      beforeEach(function() {
        subject.handleKeyup({ keyCode: AutocompleteInput.CMD_KEYCODES.enter });
      });

      it("does not call the onTextEntry callback", function() {
        expect(subject.options.onTextEntry).to.not.have.been.called;
      });

      it("calls the onCommand callback with the given command", function() {
        expect(subject.options.onCommand).to.have.been.calledWith("enter");
      });
    });

    describe("text", function() {
      beforeEach(function() {
        subject.$el.val("test");
        subject.handleKeyup({ keyCode: 84 });
      });

      it("calls the onTextEntry callback", function() {
        expect(subject.options.onTextEntry).to.have.been.calledWith("test");
      });

      it("does not call the onCommand callback with the given command", function() {
        expect(subject.options.onCommand).not.to.have.been.called;
      });
    });
  });
});
