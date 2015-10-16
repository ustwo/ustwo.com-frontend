import glob from 'glob';

module.exports = {
  toPath: function () {
    var args = Array.prototype.slice.call(arguments);

    return args.join('/');
  },
  getAllComponentNames: function (callback) {
    glob("src/app/components/**/index.js", function (er, files) {
      callback(files.map(function (path) {
        return path.split('/')[3];
      }));
    });
  },
  getAllComponentSandboxNames: function (callback) {
    glob("src/app/components/**/sandbox.js", function (er, files) {
      callback(files.map(function (path) {
        return path.split('/')[3];
      }));
    });
  }
};
