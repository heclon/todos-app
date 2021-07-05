
module.exports = async () => {
  process.env.PORT = '3333'; // so not to clash with a dev server on 3000
  process.env.NODE_ENV = 'test';
  process.env.LOG_LEVEL = 'error'; // quiet stdout (comment out for debugging)

  try {
    console.info("\n Setting NODE_ENV to 'test'."); // eslint-disable-line no-console
    process.env.NODE_ENV = 'test';

    console.info('\n Setting up environment variables.'); // eslint-disable-line no-console
    require('dotenv-safe').config(); // eslint-disable-line global-require
  } catch (exception) {
    console.warn('No .env file could be found. Probably running in CI.');
  }

  // Fail tests when a promise rejects, but isn't caught
  // See also: http://2ality.com/2016/04/unhandled-rejections.html
  process.on('unhandledRejection', rejection => {
    throw rejection;
  });

  // It's possible to store a promise, then at some time in the future, attach a
  // `.catch()` which handles any errors. While this is _possible_, it's not a
  // good pattern (too easy to forget to attach a `.catch()`), so node throws a
  // warning on the next tick if a promise hasn't been given a `.catch()`.
  // This log gives a much more meaningful stack trace for hunting down the issues
  // in node >= 7.9
  // See also: http://stackoverflow.com/a/40921505/473961
  process.on('warning', warning => {
    if (warning.name === 'PromiseRejectionHandledWarning') {
      console.log(warning.stack);
    }
  });
};
