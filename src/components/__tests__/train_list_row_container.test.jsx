import { shallow } from "enzyme";
import React from "react";
import TrainListRowContainer from "../train_list_row/train_list_row_container.jsx";

/*
  component @props:
    isHeader: is row a header line
    cancelled: is train cancelled
    delayed: is train delayed
    delayedTime: new time train is delayed to
    name: trains name / code number
    departureStation: station leaving from at first
    arrivalStation: station arriving to at last
    time: time train is scheduled for
*/
describe("TrainListRowContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <TrainListRowContainer
        delayed={true}
        delayedTime="12:12"
        name="train"
        departureStation="helsinki"
        arrivalStation="Oulu"
        time="12:10"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
