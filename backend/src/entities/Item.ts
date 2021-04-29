import {ObjectType, Field, ID, Authorized} from "type-graphql";
import {prop as Property, getModelForClass, getName} from "@typegoose/typegoose";
import {List} from "./List"
import {Tag} from "./Tag"
import {User} from "./User"
import {Ref} from "../types"
@ObjectType({description: "the todo item model"})
export class Item {
  @Field(type => ID)
  @Authorized()
  id!: string

  @Field(type => String)
  @Authorized()
  @Property()
  text!: string

  @Field(type => Boolean)
  @Authorized()
  @Property({default: false})
  isDone!: boolean

  @Field(type => [Tag], {nullable: true})
  @Authorized()
  @Property({required: false, default: [], ref: () => Tag})
  tags?: Ref<Tag>[]

  @Field(type => String)
  @Authorized()
  @Property({default: "none"})
  priority: string

  @Field({nullable: true})
  @Authorized()
  @Property()
  dueDate?: Date

  @Field(type => User, {nullable: false})
  @Authorized()
  @Property({ref: () => User})
  belongTo!: Ref<User>

  @Field(type => List, {nullable: true})
  @Authorized()
  @Property({ref: () => List})
  project?: Ref<List>

}

export const ItemModel = getModelForClass(Item);