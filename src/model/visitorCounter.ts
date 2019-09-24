import { Schema, Model, model, Document} from 'mongoose';

export interface IVisitor extends Document {
  /** 访客 ip */
  ip: string;

  /** 访问历史 */
  history: Array<String>;
}

export interface IVisitorCounter extends Document {
  /** url */
  referer: string;

  /** 该 url 访问量 */
  count_pv: number;

  /** 该 url 访客量 */
  count_uv: number;  
}

const visitorSchema: Schema = new Schema({
  ip: String,
  history: [String]
});

const visitorCounterSchema: Schema = new Schema({
  referer: String,
  count_pv: Number,
  count_uv: Number
});

export const Visitor: Model<IVisitor> = model<IVisitor>("Visitor", visitorSchema);
export const VisitorCounter: Model<IVisitorCounter> = model<IVisitorCounter>("VisitorCounter", visitorCounterSchema);