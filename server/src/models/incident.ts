import { Document, Schema, Model, model } from 'mongoose';
import IFeedIncident from '../interfaces/feedIncident';

export interface IIncident extends Document {
  _id: string,
  title: string,
  content: string,
  link: string,
  pubDate: Date,
  point: {
    type: { type: string },
    coordinates: [number]
  }
}

export const IncidentSchema: Schema = new Schema({
  _id: { type: String },
  title: String,
  content: String,
  link: String,
  pubDate: Date,
  point: {
    type: { type: String },
    coordinates: [],
  },
});
IncidentSchema.index({ 'point': '2dsphere' });

export const Incident: Model<IIncident> = model<IIncident>("Incident", IncidentSchema);

export function incidentAttrsFromFeedIncident(feedIncident: IFeedIncident): any {
  return {
    _id: feedIncident.guid,
    point: {
      type: 'Point',
      coordinates: [
        parseFloat(feedIncident['geo:long']),
        parseFloat(feedIncident['geo:lat'])
      ],
    },
    content: feedIncident.content,
    title: feedIncident.title,
    pubDate: feedIncident.pubDate
  }
}
