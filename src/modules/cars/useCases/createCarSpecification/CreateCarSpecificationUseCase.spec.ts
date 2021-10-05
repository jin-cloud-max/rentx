import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a car that does not exists", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["123", "4321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Focus",
      description: "Carro elegante",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "12344n4n32n",
    });

    const specifications = await specificationRepositoryInMemory.create({
      description: "Teste",
      name: "Teste Nome",
    });

    const specifications2 = await specificationRepositoryInMemory.create({
      description: "Teste 2",
      name: "Teste Nome 2",
    });

    const car_id = car.id;
    const specifications_id = [specifications.id, specifications2.id];

    const carsSpecifications = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    expect(carsSpecifications).toHaveProperty("specifications");
    expect(carsSpecifications.specifications.length).toBe(2);
  });
});
