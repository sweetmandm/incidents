const Parser = require('rss-parser');
import IRssParser from '../../interfaces/rssParser';

class IncidentRssParser extends Parser implements IRssParser {
  url: string

  constructor() {
    super({
      customFields: {
        item: ['geo:long', 'geo:lat']
      }
    });
    this.url = 'https://inciweb.nwcg.gov/feeds/rss/incidents';
  }

  fetchFeed(): any {
    return super.parseURL(this.url);
  }
}

export default IncidentRssParser;
