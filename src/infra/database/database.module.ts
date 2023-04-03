import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaRepository } from './prisma/repositories/prisma-notifications-repositories';
import { NotificationRepository } from 'src/application/repositories/notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
