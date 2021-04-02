import {InputType, Field, ID} from "type-graphql";
import {Item} from "../../entities/Item";

@InputType()
export class ItemInput implements Partial<Item> {
  @Field(type => String, {nullable: false})
  text!: string

  @Field(type => Boolean, {nullable: true})
  isDone?: boolean

  @Field(type => [String], {nullable: true})
  tags?: string[]

  @Field(type => String, {nullable: true})
  priority?: string

  @Field({nullable: true})
  dueDate?: Date

  @Field(type => ID, {nullable: false})
  belongTo!: string

  @Field(type => ID, {nullable: true})
  project?: string
}

@InputType()
export class ItemFilter implements Partial<Item> {
  @Field(type => String, {nullable: true})
  text?: string
  
  @Field(type => Boolean, {nullable: true})
  isDone?: boolean

  @Field(type => [ID], {nullable: true})
  tags?: string[]

  @Field(type => ID, {nullable: false})
  belongTo!: string

  @Field(type => ID, {nullable: true})
  project?: string

  @Field(type => Boolean, {nullable: true})
  today?: boolean

  dueDate: Date
}