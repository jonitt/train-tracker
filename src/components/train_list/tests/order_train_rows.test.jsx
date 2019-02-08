import { shallow } from "enzyme";
import React from "react";
import TrainListContainer from "../train_list_container.jsx";

const stations = require("./../../../utils/_example_train_timetable.js");

const trains = [];

const wrapper = shallow(
  <TrainListContainer
    trains={trains}
    stations={stations}
    chosenStationCode="TPE"
  />
);

const trainRows = [
  ["", "2018-11-02T10:31:29.000Z"],
  ["", "2018-12-02T13:33:45.000Z"],
  ["", "2017-10-02T12:31:29.000Z"],
  ["", "2018-11-02T09:32:29.000Z"],
  ["", "2018-11-02T10:30:29.000Z"],
  ["", "2018-09-01T13:33:29.000Z"]
];

test("orderTrainRows doesn't modify list size", () => {
  const rows = wrapper.instance().orderTrainRows(trainRows);
  expect(rows.length).toBe(trainRows.length);
});
