import { Request, Response } from "express";
import { getAllColors } from "../services/colorService";
import Logger from "../lib/logger";

const getAllColorsHandeler = async (req: Request, res: Response) => {
    try {
      const colors = await getAllColors();
      res.status(200).json(colors);
      Logger.info(`${colors.length} colors were found`);
    } catch (error) {
      res.status(500).json({ error: error.message });
      Logger.error(`${error}: ${error.message}`);
    }
  };

export {getAllColorsHandeler}