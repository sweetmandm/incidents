import IRssParser from '../../interfaces/rssParser';
import IRssItem from '../../interfaces/rssItem';
import IFeedIncident from '../../interfaces/feedIncident';

class RssFetch {
  feedUrl: string;
  rss: IRssParser;

  constructor(rss: IRssParser) {
    this.rss = rss;
  }

  fetchFrom(last: Date): Promise<IRssItem[]> {
    return this.rss.fetchFeed().then((data) => {
      if (!last) { return data.items; }
      return data.items.filter((i) => new Date(i.pubDate) > last);
    });
  }
}

export default RssFetch;
