import { Injectable } from '@nestjs/common';

const SET = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';

const random = (length: number) => Math.floor(Math.random() * length);

@Injectable()
export class Tokenizer {
  generate(length: number = 8): string {
    let token = '';

    for (let i = 0; i < length; i++) {
      token += SET[random(SET.length)];
    }

    return token;
  }
}
