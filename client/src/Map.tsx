import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';
import config from './config';
import { incidentsToGeoJSON } from './GeoJSON';
import IIncident from './interfaces/incident';

(mapboxgl as any).accessToken = config.token;

export interface IProps {
  incidents: IIncident[];
}

interface IState {
  incidents: IIncident[];
}

class Map extends React.Component<IProps, IState> {
  public map: any;
  public mapContainer: any;
  public markers: any;

  public constructor(props: IProps) {
    super(props);
    this.state = { incidents: props.incidents };
  }

  public componentDidMount() {
    this.map = new mapboxgl.Map({
      center: [-98.57595, 39.828175],
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 3
    });
    this.map.on('load', this.addMapMarkers.bind(this));
  }

  public componentWillUnmount() {
    this.map.remove();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ incidents: nextProps.incidents });
  }

  public render() {
    return <div className='map' ref={el => this.mapContainer = el} />;
  }

  protected addMapMarkers() {
    this.map.addSource('incidents', {
      data: incidentsToGeoJSON(this.state.incidents),
      type: 'geojson'
    });
    this.state.incidents.forEach((incident) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = 'hey!';
      new mapboxgl.Marker(el, { offset: [0, 23] })
      .setLngLat({
        lat: incident.point.coordinates[1],
        lng: incident.point.coordinates[0]
      }).addTo(this.map);
    });
  }
}

export default Map;
