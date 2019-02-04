import React from "react";
import TrainList from "./train_list.jsx";

class TrainListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trains: []
    };
  }

  render() {
    return (
      <TrainList trains={this.state.trains} />
    );
  }
}

export default TrainListContainer;
