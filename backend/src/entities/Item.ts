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
  @Property({default: []})
  tags!: string[]

  @Field(type => String)
  @Property()
  priority: string

  @Field(type => String)
  @Property()
  dueDate: string

  @Field(type => List, {nullable: false})
  @Property({ref: () => List})
  belongTo!: Ref<List>

}

console.log(Item)

export const ItemModel = getModelForClass(Item);