import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Dropdown, Input, Icon } from 'semantic-ui-react';
import MyTable from './components/table';

import './App.css';
import 'leaflet/dist/leaflet.css';

import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mapOpen: true,
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
      ]
    }
  }

  toggleMap = () => {
    this.setState({ mapOpen: !this.state.mapOpen });
  }

  render() {
    return (
      <div className='App'>
        <div className='data panel'>
          <h1>Dope Project Name</h1>
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
            maxZoom={16}
          >
            <TileLayer
              attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={"https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=" + process.env.REACT_APP_JAWG_TOKEN}
            />
          </MapContainer>
        </div>
      </div>
    );
  }
}

export default App;
