import * as React from 'react';
import IIncident from '../interfaces/incident';
import IncidentRow from './IncidentRow';

export interface IProps {
  incidents: IIncident[];
  onClick: (incident: IIncident) => void;
}

interface IState {
  incidents: IIncident[];
  onClick: (incident: IIncident) => void;
}

class IncidentList extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      incidents: props.incidents,
      onClick: props.onClick
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ incidents: nextProps.incidents });
  }

  public render() {
    return (
      <div>
        <div><button>List</button></div>
        <div className='incident-list sm-closed'>
          <div className='title'>
            <h2>🔥 Incidents</h2>
          </div>
          <div className='incidents'>
            {this.state.incidents.map((i) => {
              return <IncidentRow
                incident={i}
                key={i.title}
                onClick={this.state.onClick} />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default IncidentList;
