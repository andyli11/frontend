import React from 'react';
import { Table, Menu, Icon, Pagination } from 'semantic-ui-react';
import ImageModal from './ImageModal';

const ELEMENTS_PER_PAGE = 5;

class MyTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: this.props.data,
      column: 'N/A',    // Set in componentDidMount.
      direction: 'N/A', // Set in componentDidMount.
      numPages: Math.ceil(this.props.data.length / ELEMENTS_PER_PAGE),
      page: 1
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

  componentDidUpdate = (prevProps, prevState) => {

    console.log('this.state.data:', this.state.data)
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data,
        numPages: Math.ceil(this.props.data.length / ELEMENTS_PER_PAGE),
        page: 1
      });
    }
  }

  render() {
    let tablePadding = 8;
    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{padding: tablePadding}}
              sorted={this.state.column === 'address' ? this.state.direction : null}
              onClick={() => this.sortTable('address')}
            >
              Location
            </Table.HeaderCell>
            <Table.HeaderCell style={{padding: tablePadding}}
              sorted={this.state.column === 'urgency' ? this.state.direction : null}
              onClick={() => this.sortTable('urgency')}
            >
              Urgency
            </Table.HeaderCell>
            <Table.HeaderCell style={{padding: tablePadding}}
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
            ? this.state.data
                .slice((this.state.page - 1) * ELEMENTS_PER_PAGE, this.state.page * ELEMENTS_PER_PAGE)
                .map(({ id, address, urgency, cost, image }) => (
                  <Table.Row key={id}>
                    <Table.Cell style={{padding: tablePadding}}>
                      <ImageModal address={address} image={image} />
                    </Table.Cell>
                    <Table.Cell style={{padding: tablePadding}}>{urgency}</Table.Cell>
                    <Table.Cell style={{padding: tablePadding}}>{cost}</Table.Cell>
                  </Table.Row>
                ))
            : 'Whoops! There\'s nothing to show here.'
          }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3' style={{ textAlign: 'center' }}>
              <Pagination
                totalPages={this.state.numPages}
                activePage={this.state.page}
                onPageChange={(e, { activePage }) => { this.setState({ page: activePage }) }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

export default MyTable;
