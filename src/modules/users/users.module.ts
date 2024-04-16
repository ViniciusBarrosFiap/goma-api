import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EmailIsUniqueValidator } from './validators/email-verificator.validator';
import { CpfIsUniqueValidator } from './validators/cpf-verificator.validator';
import { OverEighteenValidator } from './validators/over-eighteen.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UserService,
    EmailIsUniqueValidator,
    CpfIsUniqueValidator,
    OverEighteenValidator,
  ],
  exports: [UserService],
})
export class UserModule {}
