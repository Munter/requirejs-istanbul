define(function () {
  'use strict';

  var noInstrumentation = {
    load: function (name, req, onload/*, config*/) {
      return req([name], onload, onload.error);
    }
  };

  try {
    var shouldInstrument = process.env.ISTANBUL === 'true';

    if (!shouldInstrument) {
      return noInstrumentation;
    }

    var fs = require.nodeRequire('fs');
    var istanbul = require.nodeRequire('istanbul');
    var instrumenter = new istanbul.Instrumenter();
  } catch(err) {
    return noInstrumentation;
  }

  return {
    load: function (name, req, onload/*, config*/) {
      var path = req.toUrl(name + '.js');

      try {
        var result = fs.readFileSync(path, 'utf8');
        var output = instrumenter.instrumentSync(result, path);

        return onload.fromText(output);
      } catch (err) {
        return onload.error(err);
      }

    }
  };

});
