import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css';

class App extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="App">
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
    );
  }
}

export default App;
