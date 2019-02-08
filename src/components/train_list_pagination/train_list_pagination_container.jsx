import React from "react";
import TrainListPagination from "./train_list_pagination.jsx";

/*
  The change of chosen and unchosen button's visuality is handled
  by passing displayPage prop from parent.
  @props:
    handleChange: handler for when different button is clicked
    displayPage: page to show
*/
class TrainListPaginationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.chosenClass =
      "train_list_pagination_chosen train_list_pagination_entry";

    this.unchosenClass =
      "train_list_pagination_unchosen train_list_pagination_entry";

    this.arrivalsKey = 0;

    this.departuresKey = 1;

    this.changeResults = this.changeResults.bind(this);

    this.state = {
      classArrivals: this.chosenClass,
      classDepartures: this.unchosenClass
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.displayPage != this.props.displayPage) {
      this.swapChosen();
    }
  }

  /*
    Calls props function with index of
    button from left to right (0, 1...).
  */
  changeResults(e, key) {
    let target = e.target;

    if (target.className == this.chosenClass) {
      return;
    }
    this.props.handleChange(key);
  }

  /*
    Change chosen and unchosen choice visually
  */
  swapChosen() {
    let temp = this.state.classArrivals;
    this.setState({
      classArrivals: this.state.classDepartures,
      classDepartures: temp
    });
  }

  render() {
    return (
      <TrainListPagination
        arrivalsKey={this.arrivalsKey}
        departuresKey={this.departuresKey}
        clickArrivals={this.changeResults}
        clickDepartures={this.changeResults}
        classArrivals={this.state.classArrivals}
        classDepartures={this.state.classDepartures}
      />
    );
  }
}

export default TrainListPaginationContainer;
