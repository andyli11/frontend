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

    return (
      <Modal
        basic
        closeIcon
        size='tiny'
        open={this.state.open}
        trigger={<button>{this.props.address}</button>}
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.setState({ open: false })}
      >
        <Image style={{margin: '0 auto'}} size='medium' src={`https://reconstruct-backend.herokuapp.com/uploads/${this.props.image}`} />
      </Modal>
    );

  }
}

export default ImageModal;
