import React from 'react';
import { Table, Pagination } from 'semantic-ui-react';

class MyTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: this.props.data,
      column: 'N/A',    // Set in componentDidMount.
      direction: 'N/A', // Set in componentDidMount.
      numPages: Math.ceil(this.props.data.length / 5),
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
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data,
        numPages: Math.ceil(this.props.data.length / 5),
        page: 1
      });
    }
    if (this.props.selectedSiteID && this.props.selectedSiteID !== prevProps.selectedSiteID){
      let newPage = Math.floor(this.findIndex(this.props.selectedSiteID) / 5) + 1;
      this.setState({
        page: newPage,
        selectedSiteID: this.props.selectedSiteID
      });
    }
  }

  findIndex = (id) => {
    for (let i = 0; i < this.state.data.length; i++){
      if (this.state.data[i].id === id) return i;
    }
    return -1;
  }

  render() {
    return (
      <Table sortable celled fixed style={{height: '10px'}}>
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
            ? this.state.data
                .slice((this.state.page - 1) * 5, this.state.page * 5)
                .map(site => (
                  <Table.Row
                    className={this.props.selectedSiteID && this.props.selectedSiteID === site.id ? 'selected site-table-row' : 'site-table-row'}
                    key={site.id}
                    onClick={this.props.selectSiteFunc ? () => this.props.selectSiteFunc(site) : null}
                  >
                    <Table.Cell>
                      {site.address}
                    </Table.Cell>
                    <Table.Cell>{site.urgency}</Table.Cell>
                    <Table.Cell>{site.cost}</Table.Cell>
                  </Table.Row>
                ))
            : 'Whoops! There\'s nothing to show here.'
          }
        </Table.Body>
        <Table.Footer style={{ display: this.state.numPages > 1 ? 'table-footer-group' : 'none' }}>
          <Table.Row>
            <Table.HeaderCell colSpan='3' style={{ textAlign: 'center' }}>
              <Pagination
                totalPages={this.state.numPages}
                activePage={this.state.page}
                onPageChange={(e, { activePage }) => { this.setState({ page: activePage, selectedSiteID: null }) }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

export default MyTable;
