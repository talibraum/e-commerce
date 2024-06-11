import { Request, Response } from "express";
import { getProducts ,getProductsByColor, updateProductById, getProductsByType ,addProduct, getProductById,deleteProductById} from "../services/productService";
import Logger from "../lib/logger";

const getProductsHandeler = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
    Logger.info(`${products.length} products were found`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const getProductsByColorHandeler = async (req: Request, res: Response) => {
    try {
      const products = await getProductsByColor(Number(req.params.id));
      if(products.length>0){
        res.status(200).json(products);
      Logger.info(`${products.length} products were found`);
      }
      else{
        res.status(404).json('products of this color wasnt found');
      Logger.info(`${products.length} products were found`);
      }
      
    } catch (error) {
      res.status(500).json({ error: error.message });
      Logger.error(`${error}: ${error.message}`);
    }
  };

  const getProductsByTypeHandeler = async (req: Request, res: Response) => {
    try {
      const products = await getProductsByType(Number(req.params.id));
      if(products.length>0){
        res.status(200).json(products);
      Logger.info(`${products.length} products were found`);
      }
      else{
        res.status(404).json('products of this type wasnt found');
      Logger.info(`${products.length} products were found`);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      Logger.error(`${error}: ${error.message}`);
    }
  };

const addProductHandeler = async (req: Request, res: Response) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json(product);
    Logger.info(`product was added`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const getProductByIdHandeler = async (req: Request, res: Response) => {
  try {
    const product = await getProductById(Number(req.params.id));
    if (product) {
      res.status(200).json(product);
      Logger.info(`product with the id ${req.params.id} was found`);
    } else {
      res.status(404).json({ message: `product with the id ${req.params.id} was not found` });
      Logger.info(`product with the id ${req.params.id} was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const deleteproductByIdHandeler = async (req: Request, res: Response) => {
  try {
    const product = await deleteProductById(Number(req.params.id));
    if (product) {
      res
        .status(200)
        .json({ message: `product with the id ${req.params.id} was deleted` });
        Logger.info(`product with the id ${req.params.id} was deleted`);
        
    } else {
      res.status(404).json({ message: `product with the id ${req.params.id} was not found` });
      Logger.info(`product with the id ${req.params.id} was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const updateProductByIdHandeler = async (req: Request, res: Response) => {
  try {
    const product = await updateProductById(Number(req.params.id), req.body);
    if (product) {
      res
        .status(200)
        .json({ message: `product with the id ${req.params.id} was updated` });
        Logger.info(`product with the id ${req.params.id} was updated` );
    } else {
      res.status(404).json({ message: `product with the id ${req.params.id} was not found` });
      Logger.info(`product with the id ${req.params.id} was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

export {
 getProductsHandeler,getProductsByColorHandeler , updateProductByIdHandeler,deleteproductByIdHandeler,getProductsByTypeHandeler,addProductHandeler,getProductByIdHandeler
};
