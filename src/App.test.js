import React from "react";
import { mount } from "enzyme";
import App from "./App";
import Linkedin from "./Components/Links/Linkedin";
import renderer from "react-test-renderer";

describe("App", () => {
  it("render correctly App component", () => {
    const app = renderer.create(<App />).toJSON();
    expect(app).toMatchSnapshot();
  });

  it("renders App without crashing", () => {
    renderer.create(<App />);
  });

  it("renders the name linking to linkedin page ", () => {
    const wrapper = mount(
      <Linkedin author="John Doe" link="https://linkedin.com/in/john.doe" />
    );

    expect(wrapper.text()).toEqual("John Doe");
  });
});
