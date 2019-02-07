import { shallow } from "enzyme";
import React from "react";
import SearchBarContainer from "../search_bar/search_bar_container.jsx";

describe("SearchBarContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SearchBarContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
