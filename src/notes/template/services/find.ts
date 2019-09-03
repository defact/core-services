import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../entities/template';

@Injectable()
export class TemplateFindService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: Repository<Template>,
  ) {}

  async findOne(id: number): Promise<Template> {
    return this.repository.findOne(id);
  }

  async find(): Promise<Template[]> {
    return this.repository.find();
  }
}

export default TemplateFindService;
