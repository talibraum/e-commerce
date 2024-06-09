import { getRepository } from "typeorm";
import { Product } from "../models/productEntity";

const getProducts = async (): Promise<Product[]> => {
  const productRepository = getRepository(Product);
  return productRepository.find({ relations: ["color", "type"] });
};

const getProductsByColor = async (colorId: number): Promise<Product[]> => {
  const productRepository = getRepository(Product);
  const productByColor = await productRepository
    .createQueryBuilder("product")
    .innerJoinAndSelect("product.color", "color")
    .where("color.id = :colorId", { colorId })
    .getMany();
  return productByColor;
};

const subtractStockOfProduct = async (
  id: number,
  amountToSubtract: number
): Promise<Product | undefined | boolean> => {
  let productToSubtract = await getProductById(id);
  if (productToSubtract) {
    if (productToSubtract.stock >= amountToSubtract) {
      productToSubtract.stock = productToSubtract.stock - amountToSubtract;
       await updateProductById(id, productToSubtract);
    } else {
      return false;
    }
  }
  return productToSubtract;
};

const addStockOfProduct = async (
  id: number,
  amountToAdd: number
): Promise<Product | undefined> => {
  const productToUpdate = await getProductById(id);
  if (productToUpdate) {
    productToUpdate.stock = amountToAdd + productToUpdate.stock;
    return await updateProductById(id, productToUpdate);
  }

  return productToUpdate;
};

const getStockOfProduct = async (id: number): Promise<number> => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ where: { id: id } });
  return product.stock;
};

const getProductsByType = async (typeId: number): Promise<Product[]> => {
  const productRepository = getRepository(Product);
  const productByType = await productRepository
    .createQueryBuilder("product")
    .innerJoinAndSelect("product.type", "type")
    .where("type.id = :typeId", { typeId })
    .getMany();
  return productByType;
};

const addProduct = async (product: Product) => {
  const productRepository = getRepository(Product);
  return productRepository.save(product);
};

const getProductById = async (id: number): Promise<Product | undefined> => {
  const productRepository = getRepository(Product);
  return productRepository.findOne({
    relations: ["color", "type"],
    where: {
      id: id,
    },
  });
};

const deleteProductById = async (id: number): Promise<Product | undefined> => {
  const product = await getProductById(id);
  if (product) {
    const userRepository = getRepository(Product);
    await userRepository.remove(product);
  }

  return product;
};

const updateProductById = async (
  id: number,
  product: Product
): Promise<Product | undefined> => {
  const productToUpdate = await getProductById(id);
  if (productToUpdate) {
    const productRepository = getRepository(Product);
    await productRepository.update(id, product);
  }

  return productToUpdate;
};

export {
  getProducts,
  getProductsByColor,
  getStockOfProduct,
  updateProductById,
  getProductsByType,
  addProduct,
  deleteProductById,
  getProductById,
  addStockOfProduct,
  subtractStockOfProduct,
};
