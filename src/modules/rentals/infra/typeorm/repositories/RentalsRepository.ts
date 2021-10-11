import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openRentalByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return openRentalByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openRentalByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    return openRentalByUser;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.repository.findOne({ where: { id } });

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    // PARA SELECIONAR APENAS ALGUNS CAMPOS DO RELACIONAMENTO USE QUERY BUILDER
    // const rentals = await this.repository
    //   .createQueryBuilder("rentals")
    //   .where("user_id = :user_id", { user_id })
    //   .leftJoinAndSelect("rentals.car", "car")
    //   .select(["car.name", "rentals.end_date"])
    //   .getMany();

    const rentals = await this.repository.find({
      // select: ["id", "total", "start_date", "end_date", "car_id"],
      where: { user_id },
      relations: ["car"],
    });

    return rentals;
  }
}

export { RentalsRepository };
