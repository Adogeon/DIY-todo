import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass, getName} from "@typegoose/typegoose";
import {List} from "./List"
import {Tag} from "./Tag"
import {Ref} from "../types"
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

  @Field(type => [Tag])
  @Property({required: true, default: [], ref: () => Tag})
  tags!: Ref<Tag>[]

  @Field(type => String)
  @Property({default: "none"})
  priority: string

  @Field(type => String)
  @Property()
  dueDate: string

  @Field(type => List, {nullable: false})
  @Property({ref: () => List})
  belongTo!: Ref<List>

}

export const ItemModel = getModelForClass(Item);