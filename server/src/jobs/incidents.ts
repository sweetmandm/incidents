/**
 * Fetch incidents from nciweb.nwcg.gov and store them in mongodb
 */

const Parser = require('rss-parser');
const db = require('../models/db');
import IFeedIncident from '../interfaces/feedIncident';
import { Incident, IIncident } from '../models/incident';

const inciwebRss = 'https://inciweb.nwcg.gov/feeds/rss/';
const incidentsRssUrl = `${inciwebRss}/incidents`;
const rss = new Parser({
  customFields: {
    item: ['geo:long', 'geo:lat'],
  }
});

function prepareDoc(doc: IFeedIncident): IIncident {
  return new Incident({
    point: {
      type: 'Point',
      coordinates: [parseFloat(doc['geo:long']), parseFloat(doc['geo:lat'])],
    },
    content: doc.content,
    title: doc.title,
    pubDate: doc.pubDate
  });
}

function fetchIncidents(): Promise<IIncident[]> {
  return new Promise((resolve) => {
    rss.parseURL(incidentsRssUrl, (err, data) => {
      const items = data.items.map(prepareDoc);
      resolve(items);
    });
  });
}

function insertIncidents(incidents: IIncident[]): void {
  Incident.insertMany(incidents);
}

function process(): void {
  fetchIncidents().then((incidents) => {
    insertIncidents(incidents);
  });
}

const Incidents = {
  process(): void { process(); },
};

export default Incidents;
