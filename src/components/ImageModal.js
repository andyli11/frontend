import React from 'react';
import { Modal, Image, Statistic } from 'semantic-ui-react';

class ImageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    let triggerButtonStyle = {
      background: 'none',
      border: 'none',
      outline: 'none',
      font: 'inherit',
      color: '#2080d0',
      cursor: 'pointer',
      padding: 0,
      margin: 0,
      textAlign: 'left'
    };

    let urgencyColor = (this.props.urgency < 10000) ? 'green' : (this.props.urgency < 20000) ? 'yellow' : 'red';

    return (
      
      <Modal
        closeIcon
        size='small'
        open={this.state.open}
        trigger={<Image src={`https://reconstruct-backend.herokuapp.com/uploads/${this.props.image}`} />}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.setState({ open: false })}
      >
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{width: '50%', maxHeight: '50vh', objectFit: 'cover', borderRadius: 4}} size='medium' src={`https://reconstruct-backend.herokuapp.com/uploads/${this.props.image}`} />
          <Modal.Description style={{ width: '50%', textAlign: 'center' }}>
            <Statistic size='large' color={urgencyColor} label='Urgency Score' value={this.props.urgency.toLocaleString()} />
            <br />
            <Statistic color='grey' label='Estimated Cost' value={'$' + this.props.cost.toLocaleString()} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );

  }
}

export default ImageModal;
