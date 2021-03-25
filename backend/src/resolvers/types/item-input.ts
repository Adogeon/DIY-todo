import {InputType, Field, ID, Int} from "type-graphql";
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

  @Field(type => String, {nullable: true})
  dueDate?: string

  @Field(type => String, {nullable: false})
  belongTo!: string

  @Field(type => String, {nullable: false})
  project!: string
}

@InputType()
export class ItemFilter implements Partial<Item> {
  @Field(type => String, {nullable: true})
  text?: string
  
  @Field(type => Boolean, {nullable: true})
  isDone?: boolean

  @Field(type => [String], {nullable: true})
  tags?: string[]

  @Field(type => String, {nullable: false})
  belongTo!: string

  @Field(type => String, {nullable: true})
  project?: string
}