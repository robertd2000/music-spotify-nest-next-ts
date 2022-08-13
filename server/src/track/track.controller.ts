import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { CommentDto } from './dto/comment.dto';
import { TrackDto } from './dto/track.dto';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: TrackDto) {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.trackService.deleteOne(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CommentDto) {
    return this.trackService.addComment(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: number) {
    return this.trackService.listen(id);
  }
}
