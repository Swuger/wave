import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { VideoFile, VideoPreview } from '@prisma/client';
import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { FileEntity } from 'src/utils/entities/file.entity';
import { User } from './../../user/entities/user.entity';

@ObjectType()
export class Video {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  isBanned: boolean;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  author: () => User;

  @Field(() => FileEntity)
  videoFile: VideoFile;

  @Field(() => FileEntity, { nullable: true })
  videoPreview?: VideoPreview;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => SubCategory, { nullable: true })
  subCategory?: SubCategory;

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [Rating], { nullable: true })
  likes?: Rating[];

  @Field(() => [Rating], { nullable: true })
  dislikes?: Rating[];
}
