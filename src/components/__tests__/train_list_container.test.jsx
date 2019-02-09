import { shallow } from "enzyme";
import TrainListContainer from "../train_list/train_list_container.jsx";
import React from "react";

describe("TrainListContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <TrainListContainer
        trains={[]}
        stations={[]}
        chosenStationCode="TPE"
        stationsSet={() => ""}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
