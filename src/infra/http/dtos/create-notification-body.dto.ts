import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 100)
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
