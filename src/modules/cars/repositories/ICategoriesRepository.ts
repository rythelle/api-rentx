import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO { //DTO objeto que é usado para transferencia de dados 
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };