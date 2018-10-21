import * as mapboxgl from 'mapbox-gl';
import * as React from 'react';
import config from '../config';
import IIncident from '../interfaces/incident';
import { incidentsToGeoJSON } from '../model/GeoJSON';

(mapboxgl as any).accessToken = config.token;

const MAP_MARKER_ID = 'incident-markers';

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
    this.map.on('load', this.resetMapMarkers.bind(this));
  }

  public componentWillUnmount() {
    this.map.remove();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ incidents: nextProps.incidents });
    this.map.on('load', this.resetMapMarkers.bind(this));
  }

  public render() {
    return <div className='map' ref={el => this.mapContainer = el} />;
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

  protected addMapMarkers() {
    this.map.addSource(MAP_MARKER_ID, {
      data: incidentsToGeoJSON(this.state.incidents),
      type: 'geojson'
    });
    this.state.incidents.forEach((incident) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = '🔥';
      const coords = {
        lat: incident.point.coordinates[1],
        lng: incident.point.coordinates[0]
      };
      new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(this.map);
    });
  }
}

export default Map;
