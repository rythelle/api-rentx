import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name_Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Carro1",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Carro2",
        description: "Description",
        daily_rate: 100,
        license_plate: "ABC",
        fine_amount: 60,
        brand: "brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC111",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
