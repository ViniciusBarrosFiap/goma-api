import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserListDTO } from './dto/UserList.dto';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

//This file is responsable for the logic for Users module

@Injectable() //Define class as Injectable
export class UsersService {
  //Start variable with functions from Repository
  constructor(
    @InjectRepository(UserEntity) //Injecting a Repository
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  //Function for list all users
  async listAllUsers() {
    const allUsers = await this.userRepository.find(); //Searching all users in DB
    const userList = allUsers.map(
      (user) => new UserListDTO(user.id, user.name, user.email),
    );
    return userList;
  }
  //Function for search a especific user
  async searchByID(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`O usuário com ${id} não foi encontrado`);
    }
    return user;
  }
  //Function for create a user
  async createUser(userData: CreateUserDto) {
    const userEntity = new UserEntity();
    Object.assign(userEntity, userData as UserEntity);

    return this.userRepository.save(userEntity);
  }
  //Function for search user with email
  async searchWithEmail(email: string) {
    const checkEmail = this.userRepository.findOne({
      where: { email },
    });
    if (checkEmail == null) {
      throw new NotFoundException(`Usuário com ${email} não foi encontrado`);
    }
    return checkEmail;
  }
  //Function to update user data
  async updateUser(id: string, newData: UpdateUserDTO) {
    const user = await this.searchByID(id);
    Object.assign(user, newData);
    return this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const response = await this.userRepository.delete(id);
    if (!response.affected) {
      throw new NotFoundException(
        `Usuário com o ID "${id}" não foi encontrado!`,
      );
    }
  }
}
