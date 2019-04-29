import React from "react";
import Footer from "./footer";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("<Footer />", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Footer text should contain application name "Find In Common"', () => {
    const wrapper = shallow(<Footer />);
    expect(
      wrapper
        .find(".footer-text")
        .render()
        .text()
    ).toMatch(/Find In Common/);
  });

  it("Footer should contain a button that scrolls to page starting position", () => {
    const wrapper = shallow(<Footer />);
  });
});
