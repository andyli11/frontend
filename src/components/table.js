import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import ImageModal from './ImageModal';

class MyTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      propsData: this.props.data,
      data: this.props.data,
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
    this.sortTable('address');
  }

  componentDidUpdate = () => {
    if (this.props.data !== this.state.propsData){
      this.setState({
        propsData: this.props.data,
        data: this.props.data
      });
    }
  }

  render() {
    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={this.state.column === 'address' ? this.state.direction : null}
              onClick={() => this.sortTable('address')}
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
            ? this.state.data.map(({ address, urgency, cost, image }) => (
              <Table.Row key={address}>
                <Table.Cell>
                  <ImageModal address={address} image={image} />
                </Table.Cell>
                <Table.Cell>{urgency}</Table.Cell>
                <Table.Cell>{cost}</Table.Cell>
              </Table.Row>
            ))
            : 'Whoops! There\'s nothing to show here.'
          }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

export default MyTable;
