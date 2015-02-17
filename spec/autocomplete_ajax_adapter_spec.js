describe("AutocompleteAjaxAdapter", function() {
  var subject;
  var onAutocomplete;
  var xhr;
  var requests;
  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
    onAutocomplete = sinon.spy();
    subject = new AutocompleteAjaxAdapter({
      url: "test",
      onAutocomplete: onAutocomplete
    });
  });

  it("requires a url", function() {
    expect(function() {
      new AutocompleteAjaxAdapter;
    }).to.throw("AutocompleteAjaxAdapter: url is undefined");
  });

  it("requires an onAutocomplete callback", function() {
    expect(function() {
      new AutocompleteAjaxAdapter({
        url: "test"
      });
    }).to.throw("AutocompleteAjaxAdapter: onAutocomplete is undefined");
  });

  it("has a throttle delay", function() {
    expect(subject.throttleDelay).to.be.a("number");
  });

  describe("#handleTextEntry", function() {
    var text;
    beforeEach(function() {
      text = "test query";
      sinon.spy(window, "clearTimeout");
      sinon.spy(subject, "queueRequest");
    });

    afterEach(function() {
      clearTimeout.restore();
    });

    it("sets the query", function() {
      subject.handleTextEntry(text);
      expect(subject.query).to.equal(text);
    });

    it("queues a request", function() {
      subject.handleTextEntry(text);
      expect(subject.queueRequest).to.have.been.called;
    });

    describe("when there's a queued request", function() {
      it("clears the timeout", function() {
        subject.queuedRequest = 5;
        subject.handleTextEntry(text);
        expect(clearTimeout).to.have.been.calledWith(5);
      });
    });

    describe("when there is not a queued request", function() {
      it("does nothing", function() {
        subject.handleTextEntry(text);
        expect(clearTimeout).not.to.have.been.called;
      });
    });
  });

  describe("#fetchItems", function() {
    it("gets the items via ajax", function() {
      subject.fetchItems();
      var request = _.last(requests);
      expect(request.url).to.equal(subject.attributes.url);
      expect(request.method).to.equal("GET");
      expect(request.requestHeaders.Accept).to.match(/application\/json/);
    });
  });
});
