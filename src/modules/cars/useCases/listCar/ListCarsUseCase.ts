/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

// @injectable()
class ListCarsUseCase {
  constructor(
    // @inject()
    private carsRepository: ICarsRepository
  ) { }
  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAllAvailableCars(brand, category_id, name);

    return cars;
  }
}

export { ListCarsUseCase };
