import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreatCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Focus",
      description: "Carro elegante",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "12344n4n32n",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be not be able to create a new car with a license plate that already exists", async () => {
    await createCarUseCase.execute({
      name: "Focus",
      description: "Carro elegante",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "12344n4n32n",
    });

    expect(
      createCarUseCase.execute({
        name: "Focus",
        description: "Carro elegante",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "12344n4n32n",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should be able to create a new car with default true", async () => {
    const car = await createCarUseCase.execute({
      name: "Focus",
      description: "Carro elegante",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "12344n4n32n",
    });

    expect(car.available).toBe(true);
  });
});
