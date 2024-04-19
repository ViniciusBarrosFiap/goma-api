import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserListDTO } from './dto/UserList.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

//This file is responsable for the logic for Users module

@Injectable() //Define class as Injectable
export class UserService {
  //Start variable with functions from Repository
  constructor(
    @InjectRepository(UserEntity) //Injecting a Repository
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  //Function for list all users
  async listAllUsers() {
    const allUsers = await this.userRepository.find(); //Searching all users in DB
    const userList = allUsers.map(
      (user) =>
        new UserListDTO(
          user.id,
          user.name,
          user.email,
          user.cpf,
          user.userType,
        ),
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
  async createUser(userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    Object.assign(userEntity, userData as UserEntity);

    return this.userRepository.save(userEntity);
  }
  //Function for search user with email
  async searchWithEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (checkEmail == null) {
      throw new NotFoundException(`Usuário com ${email} não foi encontrado`);
    }
    return checkEmail;
  }
  //Function for search user with cpf
  async searchByCpf(cpf: string) {
    const checkCpf = await this.userRepository.findOne({
      where: { cpf },
    });
    if (checkCpf == null) {
      throw new NotFoundException(
        `Usuário com cpf: ${cpf}, não foi encontrado`,
      );
    }
    return checkCpf;
  }
  //Function to check if user is over eighteen
  async checkYearsOld(dateOfBirth: string) {
    const [day, month, year] = dateOfBirth.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day); // month - 1 porque os meses em JavaScript são baseados em zero

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18;
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
