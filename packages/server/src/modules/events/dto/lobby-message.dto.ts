import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/rooms')
export class LobbyMessageDto {
  @ApiProperty({
    type: String,
    description: 'Message to send',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}