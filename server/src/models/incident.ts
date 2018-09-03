import { Document, Schema, Model, model } from 'mongoose';

export interface IIncident extends Document {
  title: string,
  description: string,
  link: string,
  pulished: Date,
  point: {
    type: { type: string },
    coordinates: [number]
  }
}

export const IncidentSchema: Schema = new Schema({
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
