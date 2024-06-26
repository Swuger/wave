import { InputType, IntersectionType } from '@nestjs/graphql';
import { OrderDto } from 'src/utils/dto/order.input';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

@InputType()
export class NotificationQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {}
