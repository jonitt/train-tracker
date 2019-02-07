import { shallow } from "enzyme";
import React from "react";
import PageHeaderContainer from "../page_header/page_header_container.jsx";

describe("PageHeaderContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<PageHeaderContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
