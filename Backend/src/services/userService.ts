import { getRepository } from "typeorm";
import { User } from "../models/userEntity";
import * as jwt from "jsonwebtoken";

const isUserValid=(user:User)=>{
  return user.address!=='' &&
  user.username!=='' &&
  user.password!==''

}


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

const getUserByUsername = async (username: string): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({
    where: {
      username: username,
    },
  });
};

const login = async (username: string,password:string): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: {
      username:username,
      password:password
    },
  });
  return user
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

export { getUsers, addUser, getUserById, deleteUserById, updateUserById ,login ,getUserByUsername ,isUserValid};
