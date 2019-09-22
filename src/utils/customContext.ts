import { RouterContext } from 'koa-router';

export interface CustomContext extends RouterContext {
  success({ message, data }: { message?: string, data?: object }): void;
  error({ message, data }: { message?: string, data?: object }): void;
  getip(): string;
}