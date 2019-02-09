import { shallow } from "enzyme";
import React from "react";
import TrainListContainer from "../train_list_container.jsx";

const stations = require("./../../../utils/examples/_example_train_timetable.js");

const trains = [];

const wrapper = shallow(
  <TrainListContainer
    trains={trains}
    stations={stations}
    chosenStationCode="TPE"
    stationsSet={() => ""}
  />
);

test("Found arrival time matches with actual arrival time", () => {
  const schedules = wrapper
    .instance()
    .getArrivalDepartureSchedule("PSL", stations);
  expect(schedules[0].scheduledTime).toBe("2019-02-07T05:02:00.000Z");
});

test("Arrival time null, when station is first entry in timetable", () => {
  const schedules = wrapper
    .instance()
    .getArrivalDepartureSchedule("HKI", stations);
  expect(schedules[0]).toBe(null);
});

test("Arrival time null, when station is not found", () => {
  const schedules = wrapper
    .instance()
    .getArrivalDepartureSchedule("AHO", stations);
  expect(schedules[0]).toBe(null);
});
