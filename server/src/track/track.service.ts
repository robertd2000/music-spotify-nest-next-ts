import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService, FileType } from 'src/file/file.service';
import {
  FindOptionsWhere,
  FindOptionsWhereProperty,
  ILike,
  Repository,
} from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { TrackDto } from './dto/track.dto';
import { Comment } from './entities/comment.entity';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepositiory: Repository<Track>,
    @InjectRepository(Comment)
    private readonly commentRepositiory: Repository<Comment>,
    private fileService: FileService,
  ) {}

  async create(dto: TrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    const newTrack = this.trackRepositiory.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });

    const track = await this.trackRepositiory.save(newTrack);

    return track;
  }

  async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
    const tracks = await this.trackRepositiory.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        comments: {
          track: true,
        },
      },
      select: {
        comments: {
          id: true,
        },
      },
      skip: offset,
      take: count,
    });
    return tracks;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackRepositiory.find({
      where: {
        name: ILike(`%${query}%`),
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        comments: {
          track: true,
        },
      },
      select: {
        comments: {
          id: true,
        },
      },
    });
    return tracks;
  }

  async getOne(id: number): Promise<Track> {
    const track = await this.trackRepositiory.findOne({
      where: { id },
      relations: {
        comments: {
          track: true,
        },
      },
      select: {
        comments: {
          id: true,
          username: true,
          text: true,
        },
      },
    });

    return track;
  }

  async deleteOne(id: number): Promise<number> {
    const track = await this.trackRepositiory.delete({ id });
    return id;
  }

  async addComment(dto: CommentDto): Promise<Comment> {
    const track = await this.trackRepositiory.findOne({
      where: { id: dto.trackId },
    });

    const comment = this.commentRepositiory.create({ ...dto, track });
    await this.trackRepositiory.save(track);
    await this.commentRepositiory.save(comment);
    return comment;
  }

  async listen(id: number) {
    const track = await this.trackRepositiory.findOne({
      where: { id },
    });

    track.listens += 1;
    this.trackRepositiory.save(track);
  }
}
