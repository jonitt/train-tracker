import { shallow } from "enzyme";
import React from "react";
import TrainListPaginationContainer from "../train_list_pagination/train_list_pagination_container.jsx";

describe("TrainListPaginationContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<TrainListPaginationContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
