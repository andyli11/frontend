import React from 'react';
import { Transition, Modal, Dimmer, Loader } from 'semantic-ui-react';
import MyTable from './Table';

class RepairPopup extends React.Component {

  render() {

    if (this.props.loading) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }

    return (
      <Transition visible={this.props.open} animation='scale' duration={400} unmountOnHide>
        <Modal
          closeIcon
          open
          onClose={this.props.onClose}
        >
          <Modal.Header>Optimized Repair Plan (${this.props.budget.toLocaleString()})</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <MyTable data={this.props.data} />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Transition>
    )
  }
}

export default RepairPopup;