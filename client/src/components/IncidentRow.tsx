import * as React from 'react';
import IIncident from '../interfaces/incident';

export interface IProps {
  incident: IIncident;
  onClick: (incident: IIncident) => void;
}

interface IState {
  incident: IIncident;
  onClick: (incident: IIncident) => void;
}

class IncidentRow extends React.Component<IProps, IState> {
  public el: HTMLElement | null;

  public constructor(props: IProps) {
    super(props);
    this.state = {
      incident: props.incident,
      onClick: props.onClick
    };
  }

  public componentDidMount() {
    if (this.el) {
      this.el.addEventListener('click', this.handleClick);
    }
  }

  public componentWillUnmount() {
    if (this.el) {
      this.el.removeEventListener('click', this.handleClick);
    }
  }

  public render() {
    return (
      <div
        ref={el => this.el = el}
        className='item'
      >
        {this.state.incident.title}
      </div>
    );
  }

  private handleClick = (event: Event) => {
    this.state.onClick(this.state.incident);
  }
}

export default IncidentRow;
