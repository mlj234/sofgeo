import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GeolocationEntity } from './geolocation.entity';

@Entity('domains')
export class DomainNames {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  domain: string;

  @ManyToOne(() => GeolocationEntity, geo => geo.domains, {
    onDelete: 'CASCADE',
  })
  geolocation: GeolocationEntity;
}
