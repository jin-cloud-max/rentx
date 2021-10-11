import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  car_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @ManyToOne(() => User, (user) => user.rental)
  @JoinColumn({ name: "user_id" })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
