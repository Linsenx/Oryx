import { CustomContext } from '../utils/customContext';

export default async (ctx: CustomContext, next) => {
  ctx.success = ({ message, data }: { message?: string, data?: object }) => {
    ctx.body = JSON.stringify({ code: 200, msg: message, data });
  };

  ctx.error = ({ message, data }: { message?: string, data?: object }) => {
    ctx.body = JSON.stringify({ code: -200, msg: message, data });
  };

  await next();
}