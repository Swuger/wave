import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { FileDto } from 'src/utils/dto/file.dto';
import { FileEntity } from 'src/utils/entities/file.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Mutation(() => Video)
  createVideo(
    @Args('dto') dto: CreateVideoDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.videoService.create(dto, user);
  }

  @Mutation(() => FileEntity)
  uploadVideo(@Args('file') file: FileDto) {
    return this.videoService.uploadFile(file, 'VIDEOS');
  }

  @Mutation(() => FileEntity)
  dropVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.deleteFile(id, 'VIDEOS');
  }

  @Mutation(() => FileEntity)
  uploadPreview(@Args('file') file: FileDto) {
    return this.videoService.uploadFile(file, 'IMAGES');
  }

  @Mutation(() => FileEntity)
  dropPreview(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.deleteFile(id, 'IMAGES');
  }

  @Query(() => [Video])
  getVideos() {
    return this.videoService.findAll();
  }

  @Query(() => Video)
  getVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.findOne(id);
  }

  @Mutation(() => Video)
  updateVideo(@Args('dto') dto: UpdateVideoDto) {
    return this.videoService.update(dto.id, dto);
  }

  @Mutation(() => Video)
  removeVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.remove(id);
  }
}
