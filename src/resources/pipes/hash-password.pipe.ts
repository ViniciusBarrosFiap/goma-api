import { PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}
  async transform(password: string) {
    const sal = process.env.SAL_PASSWORD;
    const hashedPassword = await bcrypt.hash(password, sal!);
    return hashedPassword;
  }
}
