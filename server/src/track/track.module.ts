import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Comment } from './entities/comment.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Comment])],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
