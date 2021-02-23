import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";
import {Ref } from "../types"
import {Todos} from "./Todos";

@ObjectType({description: "The User model"})
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @Property({unique: true})
  username!: string;

  @Field(_type => [Todos], {nullable: true})
  @Property({ref: Todos})
  todos?: Ref<Todos>[];
}

export const UserModel = getModelForClass(User);