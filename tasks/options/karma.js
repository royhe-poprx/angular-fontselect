var files = require('../files');

module.exports = {
  options: {
    frameworks: [
      'jasmine'
    ],
    files: files.testEnv.concat(files.source).concat([files.allPartials, files.tests])
  },
  all: {
    options: {
      browsers: ['PhantomJS', 'Chrome', 'Firefox'],
      singleRun: true
    }
  },
  headless: {
    options: {
      browsers: ['PhantomJS'],
      singleRun: true
    }
  },
  watch: {
    options: {
      browsers: ['Chrome'],
      background: true
    }
  }
};