import { Module } from '@nestjs/common';
import { CaslService } from './services/casl.service';

@Module({
  providers: [CaslService],
})
export class CaslModule {}
