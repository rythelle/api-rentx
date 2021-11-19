import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno",
      description: "Carro pequeno",
      daily_rate: 80.0,
      license_plate: "ABC-5554",
      fine_amount: 30,
      brand: "Fiat",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno1",
      description: "Carro pequeno",
      daily_rate: 80.0,
      license_plate: "ABC-5555",
      fine_amount: 30,
      brand: "Fiat1",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Fiat1",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno3",
      description: "Carro pequeno",
      daily_rate: 80.0,
      license_plate: "ABC-5556",
      fine_amount: 30,
      brand: "Fiat2",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Uno3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno3",
      description: "Carro pequeno",
      daily_rate: 80.0,
      license_plate: "ABC-5556",
      fine_amount: 30,
      brand: "Fiat2",
      category_id: "1111",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1111",
    });

    expect(cars).toEqual([car]);
  });
});
