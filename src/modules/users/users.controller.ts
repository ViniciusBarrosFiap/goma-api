import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { HashPasswordPipe } from 'src/resources/pipes/hash-password.pipe';
import { UserListDTO } from './dto/UserList.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';
// import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  //method for create a user
  @Post()
  async createUser(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...userData }: CreateUserDTO,
    @Body('password', HashPasswordPipe) hashPassword: string,
  ) {
    const createdUser = await this.userService.createUser({
      ...userData,
      password: hashPassword,
    });
    return {
      user: new UserListDTO(
        createdUser.id,
        createdUser.name,
        createdUser.email,
        createdUser.cpf,
        createdUser.userType,
        createdUser.address,
        createdUser.cellNumber,
      ),
      message: 'Usuário criado com sucesso',
    };
  }
  //method for listing all users
  @Get()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AuthenticationGuard)
  @Roles(UserType.Admin)
  async listAllUsers() {
    return await this.userService.listAllUsers();
  }

  //method for getting one specific user by id
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AuthenticationGuard)
  @Roles(UserType.User)
  @Roles(UserType.Admin)
  async getUser(@Param('id') id: string) {
    const user = await this.userService.searchByID(id);
    return {
      user: new UserListDTO(
        user.id,
        user.name,
        user.email,
        user.cpf,
        user.userType,
        user.address,
        user.cellNumber,
      ),
    };
  }
  //method to update an existing user
  @Put(':id')
  @UseGuards(AuthenticationGuard)
  @Roles(UserType.User)
  async updateUser(
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...updateData }: UpdateUserDTO,
    @Body('password', HashPasswordPipe) hashPassword: string,
  ) {
    const updatedUser = await this.userService.updateUser(id, {
      ...updateData,
      password: hashPassword,
    });
    return {
      user: updatedUser,
      message: 'Usuário atualizado com sucesso',
    };
  }
  //method to delete a user from the
  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @Roles(UserType.Admin)
  @Roles(UserType.User)
  async removeUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
