import {
  Body,
  Controller,
  Get,
  Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { HashPasswordPipe } from 'src/resources/pipes/hash-password.pipe';
import { UserListDTO } from './dto/UserList.dto';
import { CreateUserDto } from './dto/CreateUser.dto';
// import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...userData }: CreateUserDto,
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
      ),
      message: 'Usuário criado com sucesso',
    };
  }

  @Get()
  async listAllUsers() {
    return await this.userService.listAllUsers();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
