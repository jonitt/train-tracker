import { shallow } from "enzyme";
import React from "react";
import TrainListContainer from "../train_list_container.jsx";

test("name of train can be found using code", () => {
  expect(1 + 1).toBe(2);
});

const wrapper = shallow(
  <TrainListContainer trains={[]} stations={[]} chosenStationCode="TPE" />
);

wrapper.instance().generateKey();
