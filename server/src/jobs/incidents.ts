/**
 * Fetch incidents from nciweb.nwcg.gov and store them in mongodb
 */

const MongoClient = require('mongodb').MongoClient;
const Parser = require('rss-parser');

const mongoUrl = 'mongodb://localhost:27017';
const inciwebRss = 'https://inciweb.nwcg.gov/feeds/rss/';
const incidentsRssUrl = `${inciwebRss}/incidents`;
const rss = new Parser({
  customFields: {
    item: ['geo:lat', 'geo:long'],
  },
});

function prepareDoc(doc: object): object {
  const point = {
    type: 'Point',
    coordinates: [doc['geo:lat'], doc['geo:long']],
  };
  return { point };
}

function fetchIncidents(): Promise<object[]> {
  return new Promise((resolve) => {
    rss.parseURL(incidentsRssUrl, (err, data) => {
      const items = data.items.map(prepareDoc);
      resolve(items);
    });
  });
}

function insertDocuments(collectionName: string, documents: object[]): void {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
    const db = client.db('incidents');
    const collection = db.collection(collectionName)
    collection.insertMany(documents, () => client.close());
  });
}

function process(): void {
  fetchIncidents().then((incidents) => {
    insertDocuments('incidents', incidents);
  });
}

const Incidents = {
  process(): void { process(); },
};

export default Incidents;
