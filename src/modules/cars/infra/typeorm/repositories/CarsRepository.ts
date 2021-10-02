import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    license_plate,
    description,
    daily_rate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const createCar = this.repository.create({
      name,
      license_plate,
      description,
      daily_rate,
      fine_amount,
      brand,
      category_id,
    });

    const car = await this.repository.save(createCar);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { license_plate },
    });

    return car;
  }
}

export { CarsRepository };
