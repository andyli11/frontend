import React from 'react';
import { Popup } from 'react-leaflet';
import { Image } from 'semantic-ui-react';
import ImageModal from './ImageModal';

class MarkerPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  openModal = () => {
    this.setState({ open: true });
  }
  closeModal = () => {
    this.setState({ open: false });
  }

  onClose = () => {
    this.props.setSiteFunc();
  }

  render () {

    return (
      <Popup
        position={[this.props.lat, this.props.lon]}
        onClose={this.onClose}
      >
        <Image
          src={`https://reconstruct-backend.herokuapp.com/uploads/${this.props.image}`}
          onClick={this.openModal}
        />
        <ImageModal
          open={this.state.open}
          title={this.props.title}
          image={this.props.image}
          urgency={this.props.urgency}
          cost={this.props.cost}
          closeFunc={this.closeModal}
        />
      </Popup>
    )
  }
}

export default MarkerPopup;