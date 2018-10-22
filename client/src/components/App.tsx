import * as React from 'react';
import IIncident from '../interfaces/incident';
import './App.css';
import IncidentList from './IncidentList';
import Map from './Map';

interface IState {
  incidents: IIncident[];
  selected: IIncident | null;
}

class App extends React.Component<object, IState>  {
  public constructor(props: object) {
    super(props);
    this.state = {
      incidents: [],
      selected: null
    };
  }

  public componentDidMount() {
    this.fetchIncidents();
  }

  public render() {
    return (
      <div className='app'>
        <IncidentList
          incidents={this.state.incidents}
          onClick={this.selectIncident}
        />
        <Map incidents={this.state.incidents} />
      </div>
    );
  }

  protected fetchIncidents() {
    fetch('http://localhost:3000/incidents')
      .then((res) =>  res.json())
      .then((json) => this.setState({ incidents: json }));
  }

  protected selectIncident = (incident: IIncident) => {
    this.setState({...this.state, selected: incident });
  }
}

export default App;
