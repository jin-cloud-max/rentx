import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Rental, (rental) => rental.user)
  rental: Rental[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
