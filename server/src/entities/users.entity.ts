import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcrypt'

/**
 * User entity, used by TypeOrm to create
 * a record in the database
 */
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  /**
   * Hash passwords before writing them to
   * the database. We don't want to store
   * passwords in the database in plain text
   */
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
