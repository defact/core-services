import { Injectable } from '@nestjs/common';
import { Group } from '../entities/group';
import { Key } from '../../common/key';

@Injectable()
export class KeyService {
  determine(parent: Group): Key {
    const range = Math.round((parent.key.end - parent.key.start) / 1000);
    const count = parent.children.length;

    const start = Math.round((count * range) + parent.key.start);
    const end = Math.round(((count + 1) * range) + parent.key.start - 1);

    return { start, end };
  }
}

export default KeyService;
