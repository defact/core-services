import { Controller, Get } from '@nestjs/common';

interface ClassifierDescriptor { id: string; name: string; }
interface ClassifiersResponse { classifiers: ClassifierDescriptor[]; }

export enum Classifier {
  Email = 'email',
  Phone = 'phone',
  Address = 'address',
  URL = 'url',
}

@Controller('contact-classifiers')
export class ContactClassifiersController {
  @Get()
  async list(): Promise<ClassifiersResponse> {
    return { classifiers: Object.keys(Classifier).map(k => ({ id: Classifier[k], name: k })) };
  }
}

export default ContactClassifiersController;
