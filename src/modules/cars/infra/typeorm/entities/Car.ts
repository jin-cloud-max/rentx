import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column({ default: true })
  available: boolean;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category, (category) => category.cars)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "cars_specifications",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Car };
