interface IIncident {
  _id: string;
  content: string;
  title: string;
  pubDate: Date;
  point: {
    coordinates: number[];
    type: string;
  };
}

export function displayDate(incident: IIncident): string {
  const d = new Date(incident.pubDate);
  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
}

export default IIncident;
