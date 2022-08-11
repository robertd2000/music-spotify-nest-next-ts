import { Base } from 'src/utils/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('Track')
export class Track extends Base {
  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  text: string;

  @Column({ default: 0 })
  listens: number;

  @Column({ default: '' })
  picture: string;

  @Column({ default: '' })
  audio: string;

  @OneToMany(() => Comment, (comment) => comment.track)
  comments: Comment[];
}
