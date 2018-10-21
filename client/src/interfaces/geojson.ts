export interface IGeoPoint {
  geometry: {
    coordinates: number[];
    type: string;
  },
  properties: any;
  type: string;
}

export interface IGeoPointCollection {
  type: string;
  features: IGeoPoint[];
}
