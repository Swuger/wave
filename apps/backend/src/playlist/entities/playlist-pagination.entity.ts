import { ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/utils/entities/pagination.entity';
import { Playlist } from './playlist.entity';

@ObjectType()
export class PlaylistPagination extends Pagination(Playlist) {}
