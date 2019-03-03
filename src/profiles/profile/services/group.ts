import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ProfileFindService } from './find';
import { ProfileEditService } from './edit';
import { GroupFindService } from '../../../security/group/services/find';
import { Group } from '../../../security/group/entities/group';
import { Profile } from '../entities/profile';

@Injectable()
export class ProfileGroupService {
  constructor(
    private readonly group: GroupFindService,
    private readonly finder: ProfileFindService,
    @Inject(forwardRef(() => ProfileEditService))
    private readonly editor: ProfileEditService,
  ) {}

  async move(pid: number, gid: number): Promise<Profile> {
    const group: Group = await this.group.findOne(gid);
    const profile: Profile = await this.finder.findOne(pid);

    if (profile === undefined) { return; }
    if (group === undefined) { return profile; }

    profile.key = group.key;

    return this.editor.update(profile.id, profile);
  }

  async moveToDefault(pid: number): Promise<Profile> {
    const group: Group = await this.findDefault();
    return this.move(pid, group.id);
  }

  async findDefault(): Promise<Group> {
    return this.group.findDefault();
  }
}

export default ProfileGroupService;
