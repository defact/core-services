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
import { NotesModule } from './notes/module';
import { TagsModule } from './tags/module';
import { SetupModule } from './setup/module';

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
    TagsModule,
    NotesModule,
    CommonModule,
    SetupModule,
    ConfigurationModule,
  ],
})
export class ApplicationModule {}
