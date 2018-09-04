import IRssItem from './rssItem';

interface IFeedIncident extends IRssItem {
  title: string;
  content: string;
  pubDate: Date;
  'geo:lat': string;
  'geo:long': string;
}

export default IFeedIncident;
