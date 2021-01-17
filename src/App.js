import React from 'react';
import { Icon as LIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { Dropdown, Input, Icon } from 'semantic-ui-react';
import MyTable from './components/table';

import titleImg from './img/reconstruct.png';
import myIcon from './img/caution_icon.png';

import './App.css';
import 'leaflet/dist/leaflet.css';

import 'semantic-ui-css/semantic.min.css';

const markerIcon = new LIcon({
  iconUrl: myIcon,
  iconSize: [25, 25]
});

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mapOpen: true,
      data: []
    }
  }

  toggleMap = () => {
    this.setState({ mapOpen: !this.state.mapOpen });
  }

  componentDidMount = () => {
    console.log('mounted')
    axios.get('https://reconstruct-backend.herokuapp.com/site/get')
      .then(result => {
        this.setState({ data: result.data.result });
      })
      .catch(err => {
        console.log('error', err);
      });
  }

  render() {
    let markers = null;
    if (this.state.data && this.state.data.length > 0){
      markers = this.state.data.map(item => {
        console.log(item)
        console.log(item.coordinates._latitude, item.coordinates._longitude)
        return <Marker key={item.id} position={[item.coordinates._latitude, item.coordinates._longitude]} icon={markerIcon} />
      });
    }
    return (
      <div className='App'>
        <div className='data panel'>
          <img className='titleImg' src={titleImg} alt='title' />
          <div>
            <Dropdown
              placeholder='Country'
              search
              selection
              disabled
              value={'ca'}
              options={[{ key: 'ca', value: 'ca', flag: 'ca', text: 'Canada' }]}
            />
            <Dropdown
              placeholder='City'
              search
              selection
              disabled
              value={'waterloo'}
              options={[{ key: 'waterloo', value: 'waterloo', text: 'Waterloo' }]}
            />
            <Input iconPosition='left' placeholder='Budget'>
              <Icon name='dollar sign' />
              <input />
            </Input>
          </div>
          <MyTable data={this.state.data} />
        <button className='mapButton' onClick={this.toggleMap}>
          <Icon
            name={this.state.mapOpen ? 'map' : 'map outline'}
            style={this.state.mapOpen ? {color: '#2775f2'} : {color: '#7a7a7a'}}
          />
        </button>
        </div>
        <div className={this.state.mapOpen ? 'map panel' : 'map panel hidden'}>
          <MapContainer
            center={[43.4643, -80.5204]}
            zoom={13}
            minZoom={10}
            //maxZoom={16}
          >
            <TileLayer
              attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={"https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=" + process.env.REACT_APP_JAWG_TOKEN}
            />
            { markers }
          </MapContainer>
        </div>
      </div>
    );
  }
}

export default App;
