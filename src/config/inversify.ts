import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';
import "reflect-metadata";
import { NaverCloudPlatformConfig } from './ncp';

const container = new Container({ autoBindInjectable: true })

container.bind(PrismaClient).toConstantValue(new PrismaClient())
container.bind(NaverCloudPlatformConfig).toConstantValue(
  new NaverCloudPlatformConfig(
    process.env.NAVER_CLOUD_PLATFORM_CLIENT_ID!!,
    process.env.NAVER_CLOUD_PLATFORM_CLIENT_SECRET!!
  )
)

export { container }
