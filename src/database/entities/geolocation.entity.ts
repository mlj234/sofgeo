import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DomainNames } from './domains-name.entity';

@Entity('geolocation')
export class GeolocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ip: string;

  @OneToMany(() => DomainNames, d => d.geolocation, {
    cascade: true,
    eager: true,
  })
  domains: DomainNames[];

  @Column()
  data: string;
}
