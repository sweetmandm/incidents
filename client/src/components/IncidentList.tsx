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
  listOpen: boolean | undefined;
}

class IncidentList extends React.Component<IProps, IState> {
  public el: HTMLElement | null = null;

  public constructor(props: IProps) {
    super(props);
    this.state = {
      incidents: props.incidents,
      listOpen: false,
      onClick: props.onClick,
      selected: props.selected,
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const isNewSelection = this.madeNewSelection(nextProps);
    this.setState({
      incidents: nextProps.incidents,
      listOpen: isNewSelection ? false : this.state.listOpen,
      onClick: nextProps.onClick,
      selected: nextProps.selected
    });
  }

  public render() {
    return (
      <div>
        <div>
          <button
            className='list-toggle'
            onClick={this.toggleList}
          >
            List
          </button>
        </div>
        <div
          className={this.buildClassName()}
        >
          <div className='title'>
            <h2>🔥 Incidents</h2>
            <button
              className='close-btn'
              onClick={this.toggleList}
              aria-label='Close List'
            >
              x
            </button>
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

  protected madeNewSelection(newProps: IProps) {
    return (newProps.selected == null ||
            this.state.selected == null ||
            newProps.selected._id !== this.state.selected._id);
  }

  protected toggleList = () => {
    this.setState({
      ...this.state,
      listOpen: !this.state.listOpen
    });
  }

  protected closeList = () => {
    this.setState({
      ...this.state,
      listOpen: false
    });
  }

  protected buildClassName(): string {
    return `incident-list ${this.state.listOpen ? 'sm-open' : 'sm-closed'}`;
  }
}

export default IncidentList;
