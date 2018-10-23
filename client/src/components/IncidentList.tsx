import * as React from 'react';
import IIncident from '../interfaces/incident';
import IncidentRow from './IncidentRow';

export interface IProps {
  incidents: IIncident[];
  onClick: (incident: IIncident) => void;
  selected: IIncident | null;
}

interface IState {
  incidents: IIncident[];
  onClick: (incident: IIncident) => void;
  selected: IIncident | null;
}

class IncidentList extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      incidents: props.incidents,
      onClick: props.onClick,
      selected: props.selected
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      incidents: nextProps.incidents,
      onClick: nextProps.onClick,
      selected: nextProps.selected
    });
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
                onClick={this.state.onClick}
                isSelected={this.isSelected(i)}
              />
            })}
          </div>
        </div>
      </div>
    );
  }

  protected isSelected(incident: IIncident) {
    if (this.state.selected === null) { return false; }
    return this.state.selected._id === incident._id;
  }
}

export default IncidentList;
