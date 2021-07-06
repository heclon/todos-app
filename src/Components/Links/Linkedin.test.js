import React from "react";
import { mount } from "enzyme";
import Linkedin from "./Linkedin";

describe("Linkedin renders correctly", () => {
  beforeEach(() => {});

  it("renders the name linking to linkedin page", () => {
    const wrapper = mount(
      <Linkedin author="John Doe" link="https://linkedin.com/in/john.doe" />
    );
    expect(wrapper.text()).toEqual("John Doe");
  });
});
