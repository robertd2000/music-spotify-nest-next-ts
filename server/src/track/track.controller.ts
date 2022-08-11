import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() dto: TrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.trackService.deleteOne(id);
  }
}
