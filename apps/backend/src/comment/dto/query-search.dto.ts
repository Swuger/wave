import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { OrderDto } from 'src/utils/dto/order.input';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

@InputType()
export class CommentsQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {
  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  text?: string;
}
