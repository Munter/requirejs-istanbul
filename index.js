define(function () {
  'use strict';

  var isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;

  return {
    load: function (name, req, onload/*, config*/) {

      if (isNode && process.env.ISTANBUL === 'true') {
        onload('instrumented');
      } else {
        req([name], onload, onload.error);
      }

    }
  };

});
