import { ICategory } from "../../types/ICategory";

class CategoryMapper {
  toDomain(persistenceCategory: ICategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

export default new CategoryMapper();
