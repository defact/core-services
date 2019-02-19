import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/module';
import { CommonModule } from './common/module';
import { ConfigurationModule } from './configuration/module';
import { ConfigurationService } from './configuration/service';
import { ProfilesModule } from './profiles/module';
import { MembershipModule } from './membership/module';
import { ContactModule } from './contact/module';

const config = new ConfigurationService();
const dbConfig = { ...config.get('database') };  // TODO move to dynamic module

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SecurityModule,
    ProfilesModule,
    MembershipModule,
    ContactModule,
    CommonModule,
    ConfigurationModule,
  ],
})
export class ApplicationModule {}
