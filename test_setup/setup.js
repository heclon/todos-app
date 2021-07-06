import * as enzyme from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
const { JSDOM } = require("jsdom");
const React = require("react");

Enzyme.configure({ adapter: new Adapter() });
global.enzyme = enzyme;
global.React = React;

global.document = new JSDOM(
  "<!doctype html><html><body><script></script></body></html>"
).window.document;
global.window = global.document.defaultView;
global.parent = global.window;
global.navigator = global.document.navigator;
global.window.Date = Date;
global.Image = window.Image;

global.window.matchMedia =
  global.window.matchMedia ||
  function matchMedia() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

const exposedProperties = ["window", "navigator", "document"];

Object.keys(global.document.defaultView).forEach((property) => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = global.document.defaultView[property];
  }
});

const originalConsoleError = global.console.error;
global.console.error = (firstArg, ...args) => {
  // silencing proptype errors caused with React and Enzyme
  if (
    typeof firstArg === "string" &&
    firstArg.startsWith("Warning: Failed prop type:")
  ) {
    return;
  }
  originalConsoleError(firstArg, ...args);
};
