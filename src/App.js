import React from 'react';
import { Icon as LIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { Dropdown, Input, Icon, Button, Modal } from 'semantic-ui-react';
import MyTable from './components/table';

import titleImg from './img/reconstruct.png';
import myIcon from './img/caution_icon.png';

import './App.css';
import 'leaflet/dist/leaflet.css';

import 'semantic-ui-css/semantic.min.css';
import ImageModal from './components/ImageModal';

const markerIcon = new LIcon({
  iconUrl: myIcon,
  iconSize: [25, 25]
});

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mapOpen: true,
      data: [],
      budget: null,
      budgetModalOpen: false,
      optimizedPlan: [],
      selectedSite: null
    }
  }

  toggleMap = () => {
    this.setState({ mapOpen: !this.state.mapOpen });
  }

  selectSite = (site) => {
    this.setState({ selectedSite: site });
  }

  handleBudgetInputChange = ev => {
    if (!isNaN(ev.target.value) && ev.target.value < 1000000000000){
      this.setState({
        budget: ev.target.value
      });
    }
  }

  handleBudgetSubmit = ev => {
    ev.preventDefault();

    if (this.state.budget && this.state.budget >= 0){
      axios.get('https://reconstruct-backend.herokuapp.com/site/optimize?budget=' + this.state.budget)
        .then(result => {
          if (result.data.result && result.data.result.length !== 0){
            this.setState({
              optimizedPlan: result.data.result[0].list,
              budgetModalOpen: true
            });
          }
          else {
            console.log('oh no.')
          }
        })
        .catch(err => {
          console.log('Error fetching optimization', err)
        });
    }
  }

  closeBudgetModal = () => { this.setState({ budgetModalOpen: false }) }

  componentDidMount = () => {
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
        return(
          <Marker
            key={item.id}
            position={[item.coordinates._latitude, item.coordinates._longitude]}
            icon={markerIcon}
            onClick={() => console.log('ellso')}
          />
        )
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
          </div>

          <MyTable data={this.state.data} selectSiteFunc={this.selectSite} />

          <form onSubmit={this.handleBudgetSubmit}>
            <Input iconPosition='left' placeholder='Budget'>
              <Icon name='dollar sign' />
              <input value={this.state.budget} onChange={this.handleBudgetInputChange} />
            </Input>
            <Button type='submit'>Calculate</Button>
          </form>

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
            { markers }
            {
              this.state.selectedSite
                ? <Popup
                    position={[this.state.selectedSite.coordinates._latitude, this.state.selectedSite.coordinates._longitude]}
                    onClose={() => this.setState({ selectedSite: null })}
                  >
                    <ImageModal
                      title={this.state.selectedSite.address}
                      image={this.state.selectedSite.image}
                      urgency={this.state.selectedSite.urgency}
                      cost={this.state.selectedSite.cost}
                    />
                  </Popup>
                : null
            }
          </MapContainer>
        </div>

        <Modal
          closeIcon
          open={this.state.budgetModalOpen}
          onClose={this.closeBudgetModal}
        >
          <Modal.Header>Optimized Repair Plan</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <MyTable data={this.state.optimizedPlan} />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;
