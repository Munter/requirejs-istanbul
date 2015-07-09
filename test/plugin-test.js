var requirejs = require('requirejs');
var expect = require('unexpected');

requirejs.config({
  baseUrl: process.cwd(),
  paths: {
    istanbul: 'index'
  }
});

var plugin = requirejs('index');

describe('requirejs-istanbul', function () {
  it('should return a loader plugin', function () {
    expect(plugin, 'to exhaustively satisfy', {
      load: expect.it('to be a function')
    });
  });

  it('should load an amd module with no instrumentation', function () {
    expect(requirejs('istanbul!fixtures/amdModule'), 'to be', 'amdModule');
  });

  describe('with environment variable ISTANBUL true', function () {
    before(function () {
      process.env.ISTANBUL = true;

      Object.keys(requirejs.s.contexts._.defined).forEach(requirejs.undef);
    });

    after(function () {
      delete process.env.ISTANBUL;

      Object.keys(requirejs.s.contexts._.defined).forEach(requirejs.undef);
    });

    it('should load an amd module', function () {
      expect(requirejs('istanbul!fixtures/amdModule'), 'to be', 'instrumented');
    });
  });
});
