import * as React from 'react';
import IIncident, { displayDate } from '../interfaces/incident';
import { renderSpecialChars } from '../util/text';

export interface IProps {
  incident: IIncident;
  isSelected: boolean;
  onClick: (incident: IIncident) => void;
}

interface IState {
  incident: IIncident;
  isSelected: boolean;
  onClick: (incident: IIncident) => void;
}

class IncidentRow extends React.Component<IProps, IState> {
  public el: HTMLElement | null;

  public constructor(props: IProps) {
    super(props);
    this.state = {
      incident: props.incident,
      isSelected: props.isSelected,
      onClick: props.onClick
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      incident: nextProps.incident,
      isSelected: nextProps.isSelected,
      onClick: nextProps.onClick
    });
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

  public shouldComponentUpdate(nextProps: IProps) {
    return (
      nextProps.incident._id !== this.state.incident._id ||
        nextProps.isSelected !== this.state.isSelected
    );
  }

  public render() {
    return (
      <button
        ref={el => this.el = el}
        className={this.buildClassName()}
      >
        <div className='incident-title'>
          {renderSpecialChars(this.state.incident.title)}
        </div>
        <div className='date'>
          {displayDate(this.state.incident)}
        </div>
      </button>
    );
  }

  private handleClick = (event: Event) => {
    this.state.onClick(this.state.incident);
  }

  private buildClassName(): string {
    return `item ${this.state.isSelected ? 'active' : ''}`
  }
}

export default IncidentRow;
