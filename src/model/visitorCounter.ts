import { Schema, Model, model, Document} from 'mongoose';

export interface IVisitorCounter extends Document {

  /**
   * 访问时间（以一个星期为一个记录周期）
   */
  date: Date;

  /**
   * url
   */
  referer: string;

  /**
   * 该 url 访问量
   */
  count_pv: number;

  /**
   * 该 url 访客量
   */
  count_uv: number;  

  /**
   * 记录访客 ip
   */
  visitor: Array<String>;  
}

const visitorCounterSchema: Schema = new Schema({
  date: Date,
  referer: String,
  count_pv: Number,
  count_uv: Number,
  visitor: [String]
});

export const VisitorCounter: Model<IVisitorCounter> = model<IVisitorCounter>("VisitorCounter", visitorCounterSchema);