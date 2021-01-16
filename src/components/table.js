import React from 'react';
import { Table } from 'semantic-ui-react';

class MyTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: [
        {
          location: 'King St.',
          urgency: 10,
          cost: 2
        },
        {
          location: 'Columbia St.',
          urgency: 7,
          cost: 7
        },
        {
          location: 'Ring Rd.',
          urgency: 9,
          cost: 11
        },
        {
          location: 'Allen St.',
          urgency: 3,
          cost: 3
        }
      ],
      column: 'N/A',    // Set in componentDidMount.
      direction: 'N/A'  // Set in componentDidMount.
    }
  }

  sortTable = (col) => {
    if (!this.state.data) return;

    let dataCopy = this.state.data.slice();

    if (col !== this.state.column){
      dataCopy.sort((a, b) => this.compareFunc(a, b, col));
      this.setState({
        data: dataCopy,
        column: col,
        direction: 'ascending'
      });
    }
    else {
      dataCopy.reverse();
      this.setState({
        data: dataCopy,
        direction: this.state.direction === 'ascending' ? 'descending' : 'ascending'
      });
    }
  }

  compareFunc = (a, b, col) => {
    if ((typeof a[col]) === 'string') {
      if (a[col].toUpperCase() < b[col].toUpperCase()) return -1;
      if (a[col].toUpperCase() > b[col].toUpperCase()) return 1;
      return 0;
    }
    else return a[col] - b[col];
  }

  componentDidMount = () => {
    this.sortTable('location');
  }

  render() {
    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={this.state.column === 'location' ? this.state.direction : null}
              onClick={() => this.sortTable('location')}
            >
              Location
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={this.state.column === 'urgency' ? this.state.direction : null}
              onClick={() => this.sortTable('urgency')}
            >
              Urgency
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={this.state.column === 'cost' ? this.state.direction : null}
              onClick={() => this.sortTable('cost')}
            >
              Estimated Cost ($)
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.state.data
            ? this.state.data.map(({ location, urgency, cost }) => (
              <Table.Row key={location}>
                <Table.Cell>{location}</Table.Cell>
                <Table.Cell>{urgency}</Table.Cell>
                <Table.Cell>{cost}</Table.Cell>
              </Table.Row>
            ))
            : 'many oopz, there is nothing'
          }
        </Table.Body>
      </Table>
    )
  }
}

export default MyTable;
