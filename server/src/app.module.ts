import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
