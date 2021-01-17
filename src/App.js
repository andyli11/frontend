import React from 'react';
import { Icon as LIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { Dropdown, Input, Icon, Button, Header } from 'semantic-ui-react';
import MyTable from './components/Table';
import MarkerPopup from './components/MarkerPopup';
import RepairPopup from './components/RepairPopup';

import titleImg from './img/reconstruct.png';
import myIcon from './img/caution_icon.png';

import './App.css';
import 'leaflet/dist/leaflet.css';

import 'semantic-ui-css/semantic.min.css';
import Toasts from './components/Toasts';

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
      budget: '',
      budgetModalOpen: false,
      loading: false,
      optimizedPlan: [],
      selectedSite: null,
      toasts: {
        count: 0,
        list: []
      }
    }
  }

  newToast = (title, content, type) => {
    let toastsListCopy = this.state.toasts.list.slice();
    let c = this.state.toasts.count;
    toastsListCopy.push({
      id: c,
      title: title,
      content: content,
      type: type
    });

    this.setState({ toasts: {
      count: c + 1,
      list:toastsListCopy
    }})

    // setTimeout(() => {
    //   this.removeToast(c);
    // }, 2500);
  }

  removeToast = (id) => {
    let toastsListCopy = this.state.toasts.list.slice();
    for (let i = 0; i < this.state.toasts.list.length; i++){
      if (toastsListCopy[i].id === id){
        toastsListCopy.splice(i, 1);
      }
    }

    this.setState({
      toasts: {
        count: this.state.toasts.count,
        list: toastsListCopy
      }
    })
  }

  toggleMap = () => {
    this.setState({ mapOpen: !this.state.mapOpen });
  }

  selectSite = (site) => {
    this.setState({ selectedSite: site });
  }

  handleBudgetInputChange = ev => {
    if (!isNaN(ev.target.value) && ev.target.value < 1000000000000) {
      this.setState({
        budget: ev.target.value
      });
    }
  }

  handleBudgetSubmit = ev => {
    ev.preventDefault();

    if (this.state.budget && this.state.budget > 0){
      this.setState({ loading: true });
      axios.get('https://reconstruct-backend.herokuapp.com/site/optimize?budget=' + this.state.budget)
        .then(result => {
          setTimeout(() => {
            if (result.data.result && result.data.result.length !== 0){
              this.setState({
                loading: false,
                optimizedPlan: result.data.result[0].list,
                budgetModalOpen: true
              });
            }
            else {
              console.log('oh no.')
              this.setState({ loading: false });
              this.newToast('Whoops!', 'No optimization could be found for this budget.', 'warning');
            }
          }, 800);
        })
        .catch(err => {
          setTimeout(() => {
            console.log('Error fetching optimization', err)
            this.setState({ loading: false });
            this.newToast('Error', 'There was a problem getting the optimization.', 'danger');
          }, 800);
        });
    }
    else {
      this.setState({ loading: false });
      this.newToast(null, 'Please enter a positive number for the budget.', 'warning');
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
        this.newToast('Error', 'There was a problem fetching the data.', 'danger');
      });
  }

  render() {
    let markers = null;
    if (this.state.data && this.state.data.length > 0){
      markers = this.state.data.map((item, i) => {
        return(
          <Marker
            key={item.id}
            position={[item.coordinates._latitude, item.coordinates._longitude]}
            icon={markerIcon}
            eventHandlers={{
              click: (e) => this.selectSite(item),
            }}
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
              value={'ca'}
              options={[{ key: 'ca', value: 'ca', flag: 'ca', text: 'Canada' }]}
            />
            <Dropdown
              placeholder='City'
              search
              selection
              value={'waterloo'}
              options={[{ key: 'waterloo', value: 'waterloo', text: 'Waterloo' }]}
            />
          </div>

          <MyTable
            data={this.state.data}
            selectedSiteID={this.state.selectedSite ? this.state.selectedSite.id : null}
            selectSiteFunc={this.selectSite}
          />

          <Header as='h3'>Optimize Spending</Header>

          <form onSubmit={this.handleBudgetSubmit}>
            <Input
              icon='dollar sign'
              iconPosition='left'
              placeholder='Budget'
              action={
                <Button tyle='submit' animated='vertical' color='yellow'>
                  <Button.Content hidden>Optimize</Button.Content>
                  <Button.Content visible>
                    <Icon name='chart line' style={{ margin: '0 1em' }} />
                  </Button.Content>
                </Button>
              }
              value={this.state.budget}
              onChange={this.handleBudgetInputChange}
            />
          </form>

          <button className='mapButton' onClick={this.toggleMap}>
            <Icon
              name={this.state.mapOpen ? 'map' : 'map outline'}
              //style={this.state.mapOpen ? {color: '#2775f2'} : {color: '#7a7a7a'}}
              color={this.state.mapOpen ? 'yellow' : 'grey'}
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
                ?
                  <MarkerPopup
                    lat={this.state.selectedSite.coordinates._latitude}
                    lon={this.state.selectedSite.coordinates._longitude}
                    title={this.state.selectedSite.address}
                    image={this.state.selectedSite.image}
                    urgency={this.state.selectedSite.urgency}
                    cost={this.state.selectedSite.cost}
                    setSiteFunc={() => this.setState({ selectedSite: null })}
                  />
                : null
            }
          </MapContainer>
        </div>

        <RepairPopup
          loading={this.state.loading}
          open={this.state.budgetModalOpen}
          onClose={this.closeBudgetModal}
          data={this.state.optimizedPlan}
        />

        <Toasts toasts={this.state.toasts.list} />
      </div>
    );
  }
}

export default App;
