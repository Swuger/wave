import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

describe('RoleResolver', () => {
  let resolver: RoleResolver;
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleResolver,
        {
          provide: RoleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<RoleResolver>(RoleResolver);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createRole', () => {
    it('should create a new role', async () => {
      const dto: CreateRoleDto = { name: 'ADMIN' };
      const createdRole = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...dto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdRole);

      expect(await resolver.createRole(dto)).toEqual(createdRole);
    });
  });

  describe('getRoles', () => {
    it('should return an array of roles', async () => {
      const roles: Role[] = [
        { id: 1, name: 'ADMIN', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'USER', createdAt: new Date(), updatedAt: new Date() },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(roles);

      expect(await resolver.getRoles()).toEqual(roles);
    });
  });

  describe('getRole', () => {
    it('should return a role by Int', async () => {
      const roleId = 1;
      const role: Role = {
        id: roleId,
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(role);

      expect(await resolver.getRole(roleId)).toEqual(role);
    });
  });

  describe('updateRole', () => {
    it('should update a role by Int', async () => {
      const roleId = 1;
      const updateRoleInput: UpdateRoleDto = {
        id: roleId,
        name: 'ADMIN',
      };
      const updatedRole = {
        ...updateRoleInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedRole as Role);

      expect(await resolver.updateRole(updateRoleInput)).toEqual(updatedRole);
    });
  });

  describe('removeRole', () => {
    it('should remove a role by Int', async () => {
      const roleId = 1;
      const removedRole: Role = {
        id: roleId,
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedRole);

      expect(await resolver.removeRole(roleId)).toEqual(removedRole);
    });
  });
});
