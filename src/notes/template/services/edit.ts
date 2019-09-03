import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../entities/template';

@Injectable()
export class TemplateEditService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: Repository<Template>,
  ) {}

  async create(data: Template): Promise<Template> {
    if (data.tags === undefined) data.tags = [];

    return await this.repository.save(data);
  }

  async update(id: number, data: Partial<Template>): Promise<Template> {
    const template: Template = await this.repository.findOne(id);
    if (template === undefined) { return; }
    this.repository.merge(template, data);
    return this.repository.save(template);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}

export default TemplateEditService;
