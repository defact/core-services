import { createParamDecorator } from '@nestjs/common';

export const Key = createParamDecorator((_, req) => {
  return req.user && req.user.key;
});