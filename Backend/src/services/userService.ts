import { getRepository, createConnection } from "typeorm";
import { User } from "../models/userEntity";

const getUsers = async (): Promise<User[]> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

const addUser = async (user: User) => {
  const userRepository = getRepository(User);
  return userRepository.save(user);
};

const getUserById = async (id: number): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({
    where: {
      id: id,
    },
  });
};

const deleteUserById = async (id: number): Promise<User | undefined> => {
  const user = await getUserById(id);
  if (user) {
    const userRepository = getRepository(User);
    await userRepository.remove(user);
  }

  return user;
};

const updateUserById = async (
  id: number,
  user: User
): Promise<User | undefined> => {
  const userToUpdate = await getUserById(id);
  if (userToUpdate) {
    const userRepository = getRepository(User);
    await userRepository.update(id,user);
  }

  return userToUpdate;
};

export { getUsers, addUser, getUserById, deleteUserById, updateUserById };
