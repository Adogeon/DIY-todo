import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";
import {User} from "./User"
import {Ref} from "../types"

@ObjectType({description: "the tag model"})
export class Tag {
  @Field(type => ID)
  id!: string

  @Field(type => String)
  @Property({nullable: false})
  text!: string

  @Field(type => User)
  @Property({ref: 'User'})
  createdBy!: Ref<User>

  @Field(type => String)
  @Property()
  colorCode!: string
}

export const TagModel = getModelForClass(Tag)