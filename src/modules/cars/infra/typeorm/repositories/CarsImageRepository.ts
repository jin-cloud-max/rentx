import { getRepository, Repository } from "typeorm";

import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";

import { CarImage } from "../entities/CarImage";

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_nmae: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_nmae });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImageRepository };
