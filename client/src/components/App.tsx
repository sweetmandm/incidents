import * as React from 'react';
import './App.css';
import IncidentList from './IncidentList';
import Map from './Map';

interface IState {
  incidents: any[];
}

class App extends React.Component<object, IState>  {
  public constructor(props: object) {
    super(props);
    this.state = { incidents: [] };
  }

  public componentDidMount() {
    this.fetchIncidents();
  }

  public render() {
    return (
      <div className='app'>
        <IncidentList incidents={this.state.incidents} />
        <Map incidents={this.state.incidents} />
      </div>
    );
  }

  protected fetchIncidents() {
    fetch('http://localhost:3000/incidents')
      .then((res) =>  res.json())
      .then((json) => this.setState({ incidents: json }));
  }
}

export default App;
