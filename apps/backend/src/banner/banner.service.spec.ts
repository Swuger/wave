import { Test, TestingModule } from '@nestjs/testing';
import { Banner, BannerTypes, Roles } from '@prisma/client';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

// need to write file tests

describe('BannerService', () => {
  let service: BannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BannerService,
        {
          provide: PrismaService,
          useValue: {
            category: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BannerService>(BannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create banner', async () => {
      const dto: CreateBannerDto = {
        title: 'test banner',
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
      };

      const user: JwtPayload = {
        email: 'mail@mail.ru',
        id: 1,
        role: Roles.ADMIN,
      };

      const createdBanner: Banner = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        bannerVideoId: null,
        description: null,
        publishDate: null,
        unpublishDate: null,
        userId: 1,
        ...dto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdBanner);

      expect(await service.create(dto, user)).toEqual(createdBanner);
    });
  });

  describe('findAll', () => {
    it('should return an array of banners', async () => {
      const banners: Banner[] = [
        {
          id: 1,
          title: 'test banner',
          bannerImageId: 1,
          type: BannerTypes.IMAGE,
          bannerVideoId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: null,
          publishDate: null,
          unpublishDate: null,
          userId: 1,
        },
        {
          id: 2,
          title: 'test banner',
          bannerImageId: 1,
          type: BannerTypes.IMAGE,
          bannerVideoId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: null,
          publishDate: null,
          unpublishDate: null,
          userId: 1,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(banners);

      expect(await service.findAll()).toEqual(banners);
    });
  });

  describe('findOne', () => {
    it('should return a banner by id', async () => {
      const bannerId = 1;

      const banner: Banner = {
        id: bannerId,
        title: 'test banner',
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
        bannerVideoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        publishDate: null,
        unpublishDate: null,
        userId: 1,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(banner);

      expect(await service.findOne(bannerId)).toEqual(banner);
    });
  });

  describe('update', () => {
    it('should update a banner by id', async () => {
      const bannerId = 1;

      const dto: UpdateBannerDto = {
        id: bannerId,
        title: 'test banner',
      };

      const updatedBanner = {
        ...dto,
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
        bannerVideoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        publishDate: null,
        unpublishDate: null,
        userId: 1,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedBanner);

      expect(await service.update(bannerId, dto)).toEqual(updatedBanner);
    });
  });

  describe('remove', () => {
    it('should remove a banner by id', async () => {
      const bannerId = 1;

      const removedBanner: Banner = {
        id: bannerId,
        title: 'test banner',
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
        bannerVideoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        publishDate: null,
        unpublishDate: null,
        userId: 1,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedBanner);

      expect(await service.remove(bannerId)).toEqual(removedBanner);
    });
  });
});
