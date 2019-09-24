import { CustomContext } from '../utils/customContext';
import { VisitorCounter, IVisitorCounter, IVisitor, Visitor } from '../model';

export class VisitorController {
  static async visit(ctx: CustomContext) {
    const referer = ctx.request.header.referer;
    if (referer === undefined) {
      return ctx.error({ message: 'please provide the referer' });
    }

    let visitor: IVisitor = await Visitor.findOne({ ip: ctx.getip() });
    if (visitor === null) {
      visitor = new Visitor();
      visitor.ip = ctx.getip();
      visitor.history = [];
      await visitor.save();
    }

    let counter: IVisitorCounter = await VisitorCounter.findOne({ referer });
    if (counter === null) {
      counter = new VisitorCounter();
      counter.referer = referer;
      counter.count_pv = 1;
      counter.count_uv = 1;
      await counter.save();
    } else {
      counter.count_pv ++;
      if (visitor.history.includes(referer) === false) {
        counter.count_uv ++;
        visitor.history.push(referer);
        await visitor.save();   
      }
      await counter.save();
    }
    return ctx.success({ data: { pv: counter.count_pv, uv: counter.count_uv } });     
  }
}