import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";
import {Ref } from "../types"
import {List} from "./List";

@ObjectType({description: "The User model"})
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @Property()
  username!: string;

  @Field( type => [List], {nullable: true})
  @Property({ref: List})
  todos?: Ref<List>[];

}

export const UserModel = getModelForClass(User);