import { CustomContext } from '../utils/customContext';
import { VisitorCounter, IVisitorCounter } from '../model';
import * as dayjs from 'dayjs';

export class VisitorController {
  static async visit(ctx: CustomContext) {
    const referer = ctx.request.header.referer;
    if (referer === undefined) {
      return ctx.error({ message: 'please provide the referer' });
    }
    const thisWeek: Date = dayjs().startOf('week').toDate();
    const counterThisWeek: IVisitorCounter = await VisitorCounter.findOne({ referer, date: thisWeek });
    if (counterThisWeek === null) {
      const newCounter = new VisitorCounter();
      newCounter.referer = referer;
      newCounter.date = thisWeek;
      newCounter.count_pv = 1;
      newCounter.count_uv = 1;
      newCounter.visitor = [ctx.getip()];
      await newCounter.save();
    } else {
      counterThisWeek.count_pv ++;
      const ip = ctx.getip();
      if (counterThisWeek.visitor.includes(ip) === false) {
        counterThisWeek.count_uv ++;
        counterThisWeek.visitor.push(ip);
      }
      await counterThisWeek.save();
    }
    let sumCounterPV: number = 0; 
    let sumCounterUV: number = 0;
    const countersTotal: IVisitorCounter[] = await VisitorCounter.find({ referer });
    countersTotal.forEach(c => { sumCounterPV += c.count_pv; sumCounterUV += c.count_uv; });
    return ctx.success({ data: { pv: sumCounterPV, uv: sumCounterUV } });
  }
}