import { createParamDecorator } from '@nestjs/common';

export const Session = createParamDecorator((data, req) => {
  return data ? req.user && req.user[data] : req.user;
});