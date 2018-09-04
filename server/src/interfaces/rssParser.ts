import IRssItem from './rssItem';

interface IRssParser {
  url: string;
  fetchFeed(): Promise<any>;
  [propName: string]: any;
}

export default IRssParser;
