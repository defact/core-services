import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt-nodejs';

export interface Hash {
  hash: string;
  salt: string;
}

@Injectable()
export class Hasher {
  generate(token: string): Hash {
    const salt: string = bcrypt.genSaltSync(9);
    const hash: string = bcrypt.hashSync(token, salt);
    return { hash, salt };
  }

  verify(compareTo: string, token: string): boolean {
    if (compareTo == null) { return false; }
    return bcrypt.compareSync(token, compareTo);
  }
}
