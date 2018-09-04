/**
 * Fetch incidents from nciweb.nwcg.gov and store them in mongodb
 */

import IncidentRssParser from './incidentRssParser';
import RssFetch from './rssFetch';
import IFeedIncident from '../../interfaces/feedIncident';
import { Incident, IIncident } from '../../models/incident';

const db = require('../../models/db');
const rss = new RssFetch(new IncidentRssParser());

function lastIncident(): Promise<IIncident> {
  return Incident.findOne().sort({ pubDate: -1 }).limit(1).exec();
}

function prepareDoc(doc: IFeedIncident): IIncident {
  return new Incident({
    _id: doc.guid,
    point: {
      type: 'Point',
      coordinates: [parseFloat(doc['geo:long']), parseFloat(doc['geo:lat'])],
    },
    content: doc.content,
    title: doc.title,
    pubDate: doc.pubDate
  });
}

function insert(items: IFeedIncident[]) {
  const incidents = items.map(prepareDoc);
  Incident.insertMany(incidents);
}

function perform() {
  lastIncident().then((last) => {
    return rss.fetchFrom(last ? last.pubDate : null);
  }).then((newItems) => {
    insert(newItems as IFeedIncident[]);
  }).catch((err) => {
    console.log(err);
  });
}

export default perform;
