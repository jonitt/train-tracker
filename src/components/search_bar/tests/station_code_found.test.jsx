import { shallow } from "enzyme";
import React from "react";
import SearchBarContainer from "../search_bar_container.jsx";

const stations = require("./../../../utils/_stations_example.js");

const wrapper = shallow(
  <SearchBarContainer
    stations={stations}
  />
);

test("Found code with off-case, incomplete station name", () => {
  let code = wrapper
    .instance()
    .getStationCode("tampere", stations);
  expect(code).toBe("TPE");
});

test("Found code with station code", () => {
  let code = wrapper
    .instance()
    .getStationCode("TPE", stations);
  expect(code).toBe("TPE");
});

test("Got empty string with incorrect name", () => {
  let code = wrapper
    .instance()
    .getStationCode("aearefef", stations);
  expect(code.length).toBe(0);
});

test("Got code with city name having white space", () => {
  let code = wrapper
    .instance()
    .getStationCode(" tampere      ", stations);
  expect(code).toBe("TPE");
});
