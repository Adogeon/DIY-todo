import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";
import dayjs from 'dayjs';

@ObjectType({description: "the todo item model"})
export class Item {
  @Field(type => ID)
  id!: string

  @Field(type => String)
  @Property()
  text!: string

  @Field(type => Boolean)
  @Property({default: false})
  isDone!: boolean

  @Field(type => [String])
  @Property({default: []})
  tags: string[]

  @Field(type => String)
  @Property()
  priority: string

  @Field(type => String)
  @Property({default: dayjs().toISOString()})
  dueDate: string
}

export const ItemModel = getModelForClass(Item);