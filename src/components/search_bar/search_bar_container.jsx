import React from "react";
import SearchBar from "./search_bar.jsx";

/*
  @props:
    stations: stations for checking if search station exists
    onSubmit: function to handle search
*/
class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.changeSearchBarValue = this.changeSearchBarValue.bind(this);

    this.searchStation = this.searchStation.bind(this);

    this.state = {
      searchBarText: "",
      hasErrorStationNotFound: false
    };
  }

  clearSearchBar() {
    this.setState({ searchBarText: "", hasErrorStationNotFound: false });
  }

  /*
    Handles searching for station starting from input keyPress event.
  */
  searchStation(e) {
    if (e.key != "Enter") {
      return;
    }

    let code = this.getStationCode(
      this.state.searchBarText,
      this.props.stations
    );

    //if station was not found, "" was retured from getstationcode
    if (code.length < 1) {
      this.setState({
        hasErrorStationNotFound: true
      });
      return;
    }

    this.setState({
      hasErrorStationNotFound: false
    });

    this.props.onSubmit(code);
  }

  /*
    Search matching station code for given station name or code.
    If no station code is found, return "".
  */
  getStationCode(name, stations) {
    let nameLower = name.trim().toLowerCase();
    for (let i = 0; i < stations.length; i++) {
      let stationName = stations[i].stationName;
      if (
        nameLower === stations[i].stationShortCode.toLowerCase() ||
        nameLower === stationName.toLowerCase() ||
        nameLower + " asema" === stationName.toLowerCase() ||
        nameLower ===
          stationName.slice(stationName.indexOf(" ") + 1).toLowerCase()
      )
        return stations[i].stationShortCode;
    }
    return "";
  }

  changeSearchBarValue(e) {
    this.setState({ searchBarText: e.target.value });
  }

  render() {
    return (
      <SearchBar
        changeSearchBarValue={this.changeSearchBarValue}
        searchBarText={this.state.searchBarText}
        handleKeyPress={this.searchStation}
        onClickDelete={() => this.clearSearchBar()}
        hasErrorStationNotFound={this.state.hasErrorStationNotFound}
      />
    );
  }
}

export default SearchBarContainer;
