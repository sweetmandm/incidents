interface IIncident {
  _id: string;
  title: string;
  point: {
    coordinates: number[];
    type: string;
  };
}

export default IIncident;
