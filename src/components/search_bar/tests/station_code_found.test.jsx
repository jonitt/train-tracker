import { shallow } from "enzyme";
import React from "react";
import SearchBarContainer from "../search_bar_container.jsx";

const stations = require("./../../../utils/examples/_stations_example.js");

const wrapper = shallow(
  <SearchBarContainer
    stations={stations}
  />
);

test("Found code with off-case, incomplete station name", () => {
  let code = wrapper
    .instance()
    .getStationCodeAndName("tampere", stations);
  expect(code[0]).toBe("TPE");
});

test("Found code with station code", () => {
  let code = wrapper
    .instance()
    .getStationCodeAndName("TPE", stations);
  expect(code[0]).toBe("TPE");
});

test("Got array string with incorrect name", () => {
  let code = wrapper
    .instance()
    .getStationCodeAndName("aearefef", stations);
  expect(code.length).toBe(0);
});

test("Got code with city name having white space", () => {
  let code = wrapper
    .instance()
    .getStationCodeAndName(" tampere      ", stations);
  expect(code[0]).toBe("TPE");
});
