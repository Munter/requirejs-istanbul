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

  it.skip('should fail when loading non-existent file', function () {
    expect(function () {
      requirejs('istanbul!fixtures/non-existent');
    }, 'to throw', /Tried loading "fixtures\/non-existent" at .*?\/fixtures\/non-existent\.js then tried node's require\("fixtures\/non-existent"\) and it failed with error: Error: Cannot find module 'fixtures\/non-existent'/);
  });

  it('should load an amd module with no instrumentation', function () {
    expect(requirejs('istanbul!fixtures/amdModule').toString(), 'to be', 'function () {\n    return \'amdModule\';\n  }');
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
      expect(requirejs('istanbul!fixtures/amdModule').toString(), 'to be', 'function (){__cov_FBCeanXQMKFmEWJQTaYoiQ.f[\'2\']++;__cov_FBCeanXQMKFmEWJQTaYoiQ.s[\'3\']++;return\'amdModule\';}');
    });
  });
});
