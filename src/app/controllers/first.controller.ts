import { Context, Get, HttpResponseOK } from '@foal/core';

export class FirstController {
  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK('First Controller');
  }
}
