import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileFindService } from './find';
import { Profile } from '../entities/profile';
import { Contact } from '../entities/contact';

@Injectable()
export class ProfileContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>,
    private readonly finder: ProfileFindService,
  ) {}

  async findByProfile(pid: number): Promise<Contact[]> {
    return this.repository.find({ where: { profile: pid }});
  }

  async add(pid: number, contact: Contact): Promise<Contact> {
    const profile: Profile = await this.finder.findOne(pid);

    // if (profile === undefined || profile.isFixed) { return; }

    contact.profile = profile;

    return this.repository.save(contact);
  }

  async update(pid: number, cid: number, data: Contact): Promise<Contact> {
    const profile = await this.finder.findOne(pid);

    // if (profile === undefined || profile.isFixed) { return; }

    const contact: Contact = await this.repository.findOne(cid);

    if (contact === undefined) { return; }

    this.repository.merge(contact, data);
    return this.repository.save(contact);
  }

  async remove(pid: number, cid: number): Promise<void> {
    const profile = await this.finder.findOne(pid);

    // if (profile === undefined || profile.isFixed) { return; }

    await this.repository.delete(cid);
  }
}

export default ProfileContactsService;
