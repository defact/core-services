import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, NotFoundException, UseGuards, HttpCode, Put } from '@nestjs/common';
import { ClaimGuard, Entity, Right } from '../../../security/common/claim';
import { ProfileContactsService } from '../services/contacts';
import { Contact } from '../entities/contact';

interface ContactResponse { contact: Contact; }
interface ContactsResponse { contacts: Contact[]; }

@Controller('profiles/:id/contacts')
export class ProfileContactsController {
  constructor(private readonly contacts: ProfileContactsService) {}

  @Get()
  @UseGuards(new ClaimGuard(Entity.Profile, Right.Read))
  async list(@Param('id', ParseIntPipe) id: number): Promise<ContactsResponse> {
    const contacts = await this.contacts.findByProfile(id);
    return { contacts };
  }

  @Post()
  @UseGuards(new ClaimGuard(Entity.Profile, Right.Update))
  async create(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<ContactResponse> {
    const contact = await this.contacts.add(id, data);
    if (contact === undefined) { throw new NotFoundException('Profile not found'); }
    return { contact };
  }

  @Put('/:cid')
  @UseGuards(new ClaimGuard(Entity.User, Right.Update))
  async update(@Param('id', ParseIntPipe) id: number, @Param('cid', ParseIntPipe) cid: number, @Body() data: any): Promise<ContactResponse> {
    const contact = await this.contacts.update(id, cid, data);
    if (contact === undefined) { throw new NotFoundException('Contact not found'); }
    return { contact };
  }

  @Delete('/:cid')
  @HttpCode(204)
  @UseGuards(new ClaimGuard(Entity.User, Right.Update))
  async remove(@Param('id', ParseIntPipe) id: number, @Param('cid', ParseIntPipe) cid: number): Promise<void> {
    await this.contacts.remove(id, cid);
  }
}

export default ProfileContactsController;
