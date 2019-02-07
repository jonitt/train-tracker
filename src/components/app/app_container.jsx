//@Author Joni Tuhkanen
import React from "react";
import App from "./app.jsx";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.stationsUrl = "https://rata.digitraffic.fi/api/v1/metadata/stations";

    this.state = {
      stations: []
    };

    this.getStationsInfo();
  }

  getStationsInfo() {
    fetch(this.stationsUrl)
      .then(res => res.json())
      .then(json => {
        console.log(json[0]);
        this.setState({ stations: json });
      });
  }

  render() {
    return <App stations={this.state.stations} />;
  }
}

export default AppContainer;
