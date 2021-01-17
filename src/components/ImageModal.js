import React from 'react';
import { Modal, Image } from 'semantic-ui-react';

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

    return (
      <Modal
        basic
        closeIcon
        size='tiny'
        open={this.state.open}
        trigger={<button style={triggerButtonStyle}>{this.props.address}</button>}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.setState({ open: false })}
      >
        <Image style={{margin: '0 auto'}} size='medium' src={`https://reconstruct-backend.herokuapp.com/uploads/${this.props.image}`} />
      </Modal>
    );

  }
}

export default ImageModal;
