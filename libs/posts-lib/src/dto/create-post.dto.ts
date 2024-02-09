import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
    id: number;
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
