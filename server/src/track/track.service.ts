import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async create(dto: TrackDto): Promise<Track> {
    const newTrack = this.trackRepositiory.create({
      ...dto,
      listens: 0,
    });

    const track = await this.trackRepositiory.save(newTrack);

    return track;
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackRepositiory.find();
    return tracks;
  }

  async getOne(id: number): Promise<Track> {
    const track = await this.trackRepositiory.findOne({
      where: { id },
    });

    return track;
  }

  async deleteOne(id: number): Promise<number> {
    const track = await this.trackRepositiory.delete({ id });
    return id;
  }
}
