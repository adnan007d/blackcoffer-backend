import mongoose, { type InferSchemaType, type Model } from "mongoose";


const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: String,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

type IData = InferSchemaType<typeof dataSchema>

const Data = (mongoose.models.Data as Model<IData>) || mongoose.model<IData>("Data", dataSchema);

export default Data
