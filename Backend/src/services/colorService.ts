import { getRepository } from "typeorm";
import { Color } from "../models/colorEntity";

const getAllColors = async (): Promise<Color[]> => {
  const colorRepository = getRepository(Color);
  return await colorRepository.find();
};

export { getAllColors };
