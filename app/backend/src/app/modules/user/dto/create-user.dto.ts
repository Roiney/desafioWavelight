import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Provide the driver name' })
  @MaxLength(64)
  @ApiProperty({
    description: 'This field is to add the user_name',
    required: true,
    example: 'johnD@e10',
  })
  name!: string;

  @IsEmail({}, { message: 'Provide a valid email address' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @ApiProperty({
    description: 'This field is for email',
    required: true,
    example: 'example@example.com',
  })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Provide the valid password' })
  @MaxLength(64)
  @IsStrongPassword()
  @ApiProperty({
    description: 'This field is to password',
    required: true,
    example: '12@#!10Aa',
  })
  password!: string;
}
