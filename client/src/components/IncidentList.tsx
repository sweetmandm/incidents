import * as React from 'react';
import './IncidentList.css';

export interface IProps {
  incidents: any[];
}

interface IState {
  incidents: any[];
}

class IncidentList extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = { incidents: props.incidents };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ incidents: nextProps.incidents });
  }

  public render() {
    return (
      <div>
        <div><button>List</button></div>
        <div className='incident-list sm-closed'>
          <h2>Incidents:</h2>
          <div className='incidents'>
            {this.state.incidents.map((i) => {
              return <div
                className='item'
                key={i.title}>
                {i.title}
              </div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default IncidentList;
