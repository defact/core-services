import { Module, Global } from '@nestjs/common';
import { Hasher } from './helpers/hash';
import { Tokenizer } from './helpers/token';

@Global()
@Module({
  providers: [
    Hasher,
    Tokenizer,
  ],
  exports: [
    Hasher,
    Tokenizer,
  ],
})
export class CommonModule {}
