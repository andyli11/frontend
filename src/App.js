import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Dropdown, Input, Icon } from 'semantic-ui-react';
import MyTable from './components/table';

import './App.css';
import 'leaflet/dist/leaflet.css';

import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
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
          <MyTable />
        </div>
        <div className='map panel'>
          <MapContainer
            center={[51.505, -0.09]}
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
