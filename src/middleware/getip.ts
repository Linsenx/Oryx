import { CustomContext } from '../utils/customContext';

/**
 * 代码来自于 https://www.jianshu.com/p/7cca94446aa8
 */
export default async (ctx: CustomContext, next) => {
  ctx.getip = (): string => {
    const req = ctx.req;
    let ip =  req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      (req.connection as any).socket.remoteAddress;
      if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
      }
    return ip;
  }

  await next();
}