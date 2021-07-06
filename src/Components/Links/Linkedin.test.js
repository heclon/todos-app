import React from "react";
import { mount } from "enzyme";
import Linkedin from "./Linkedin";
import renderer from "react-test-renderer";

describe("Linkedin renders correctly", () => {
  beforeEach(() => {});

  it("renders the name linking to linkedin page", () => {
    const wrapper = mount(
      <Linkedin author="John Doe" link="https://linkedin.com/in/john.doe" />
    );
    expect(wrapper.text()).toEqual("John Doe");
  });

  it("snapshot test render correctly App component", () => {
    const wrapper = renderer
      .create(
        <Linkedin author="John Doe" link="https://linkedin.com/in/john.doe" />
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
