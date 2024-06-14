import { Request, Response } from "express";
import { getAllTypes } from "../services/typeService";
import Logger from "../lib/logger";

const getAllTypesHandeler = async (req: Request, res: Response) => {
    try {
      const types = await getAllTypes();
      res.status(200).json(types);
      Logger.info(`${types.length} types were found`);
    } catch (error) {
      res.status(500).json({ error: error.message });
      Logger.error(`${error}: ${error.message}`);
    }
  };

export {getAllTypesHandeler}