import { Base } from 'src/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Track } from './track.entity';

@Entity('Comment')
export class Comment extends Base {
  @Column()
  username: string;

  @Column()
  text: string;

  @ManyToOne(() => Track, (track) => track.comments)
  @JoinColumn({ name: 'track_id' })
  track: Track;
}
