import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';
import config from '../config';
import IIncident from '../interfaces/incident';
import { incidentsToGeoJSON } from '../model/GeoJSON';

(mapboxgl as any).accessToken = config.token;

const MAP_MARKER_ID = 'incident-markers';

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

class Map extends React.Component<IProps, IState> {
  public map: any;
  public mapContainer: any;
  public markers: any;

  public constructor(props: IProps) {
    super(props);
    this.state = { ...props };
  }

  public componentDidMount() {
    this.map = new mapboxgl.Map({
      center: [-98.57595, 39.828175],
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 3
    });
    this.map.on('load', this.resetMapMarkers.bind(this));
  }

  public componentWillUnmount() {
    this.map.remove();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ ...nextProps }, () => {
      if (this.state.selected) {
        this.showIncident(this.state.selected);
      }
    });
    this.map.on('load', this.resetMapMarkers.bind(this));
  }

  public render() {
    return <div
      className='map'
      ref={el => this.mapContainer = el}
    />;
  }

  protected resetMapMarkers() {
    this.removeMapMarkers(this.addMapMarkers.bind(this));
  }

  protected removeMapMarkers(cb: () => void) {
    if (this.map.getSource(MAP_MARKER_ID) !== undefined) {
      this.map.removeSource(MAP_MARKER_ID, cb);
    } else {
      cb();
    }
  }

  protected handleClick = (incident: IIncident) => {
    this.state.onClick(incident);
  }

  protected addMapMarkers() {
    this.map.addSource(MAP_MARKER_ID, {
      data: incidentsToGeoJSON(this.state.incidents),
      type: 'geojson'
    });
    this.state.incidents.forEach((incident) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = '🔥';
      el.addEventListener('click', this.handleClick.bind(this, incident));
      const coords = {
        lat: incident.point.coordinates[1],
        lng: incident.point.coordinates[0]
      };
      new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(this.map);
    });
  }

  protected showIncident(incident: IIncident | null) {
    this.zoomToIncident(incident);
    this.showPopup(incident);
  }

  protected zoomToIncident(incident: IIncident | null) {
    if (incident) {
      this.map.flyTo({
        center: incident.point.coordinates,
        offset: [0, 170],
        zoom: 5
      });
    }
  }

  protected showPopup(incident: IIncident | null) {
    const existing = document.getElementsByClassName('mapboxgl-popup');
    if (existing[0]) { existing[0].remove(); }
    if (incident) {
      const coords = {
        lat: incident.point.coordinates[1],
        lng: incident.point.coordinates[0]
      };
      const opts: mapboxgl.PopupOptions = {
        anchor: 'bottom',
        className: 'incident-popup',
        closeOnClick: false,
        offset: [0, -10]
      };
      new mapboxgl.Popup(opts)
        .setLngLat(coords)
        .setHTML(`<h3>${incident.title}</h3><p>${incident.content}</p>`)
        .addTo(this.map);
    }
  }
}

export default Map;
