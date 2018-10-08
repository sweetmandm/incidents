/**
 * Fetch incidents from nciweb.nwcg.gov and store them in mongodb
 */

import IncidentRssParser from './incidentRssParser';
import RssFetch from './rssFetch';
import IFeedIncident from '../../interfaces/feedIncident';
import { Incident, IIncident, incidentAttrsFromFeedIncident } from '../../models/incident';

const db = require('../../models/db');
const rss = new RssFetch(new IncidentRssParser());

function lastIncident(): Promise<IIncident> {
  return Incident.findOne().sort({ pubDate: -1 }).exec();
}

function upsert(items: IFeedIncident[]) {
  const incidents = items.map(incidentAttrsFromFeedIncident);
  incidents.forEach(function(incident) {
    console.log(`Incident ID: ${incident._id}`)
    Incident.findOneAndUpdate(
      {_id: incident._id},
      {$set: incident},
      { upsert: true });
  });
}

function performIncidentFetch() {
  lastIncident().then((last) => {
    console.log(`Last incident: ${last._id} d: ${last.pubDate}`)
    return rss.fetchFrom(last ? last.pubDate : null);
  }).then((newItems) => {
    upsert(newItems as IFeedIncident[]);
  }).catch((err) => {
    console.log(err);
  });
}

export default performIncidentFetch;
