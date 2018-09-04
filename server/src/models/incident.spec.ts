const expect = require('chai').expect;
import IFeedIncident from '../interfaces/feedIncident';
import { Incident, incidentAttrsFromFeedIncident } from './incident';

const feedIncident: IFeedIncident = {
  title: 'The Title',
  guid: 'https://site.com/the/guid/',
  content: 'This is the content',
  pubDate: new Date('2018-09-03T02:06:38Z'),
  'geo:lat': '38.348888888889',
  'geo:long': '-119.92944444444',
};

describe('Incident', () => {
  it('should instantiate from a feed incident', () => {
    const incident = incidentAttrsFromFeedIncident(feedIncident);
    expect(incident._id).to.equal(feedIncident.guid)
    expect(incident.title).to.equal(feedIncident.title)
    expect(incident.content).to.equal(feedIncident.content)
    expect(incident.pubDate).to.equal(feedIncident.pubDate)
    expect(incident.point.coordinates[0]).to.equal(parseFloat(feedIncident['geo:long']))
    expect(incident.point.coordinates[1]).to.equal(parseFloat(feedIncident['geo:lat']))
  });
});
