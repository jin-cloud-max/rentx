import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private specificationsRepository: Repository<Specification>;

  constructor() {
    this.specificationsRepository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specificationsRepository.create({
      name,
      description,
    });

    await this.specificationsRepository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specificationsRepository.findOne({
      where: { name },
    });

    return specification;
  }
}

export { SpecificationRepository };
