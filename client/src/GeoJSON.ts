import { IGeoPoint, IGeoPointCollection } from './interfaces/geojson';
import IIncident from './interfaces/incident';

function incidentToGeoJSON(incident: IIncident): IGeoPoint {
  return {
    geometry: {
      coordinates: incident.point.coordinates,
      type: 'Point'
    },
    properties: {
      name: incident.title
    },
    type: 'Feature'
  };
}

export function incidentsToGeoJSON(incidents: IIncident[]): IGeoPointCollection {
  return {
    features: incidents.map(incidentToGeoJSON),
    type: "FeatureCollection"
  };
}
