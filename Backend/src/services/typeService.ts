import { getRepository } from "typeorm";
import { Type } from "../models/typeEntity";

const getAllTypes = async (): Promise<Type[]> => {
  const typeRepository = getRepository(Type);
  return await typeRepository.find();
};

export { getAllTypes };
