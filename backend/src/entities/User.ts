import {ObjectType, Field, ID} from "type-graphql";
import {prop as Property, getModelForClass} from "@typegoose/typegoose";
import {Ref } from "../types"
import {List} from "./List";
import {Tag} from "./Tag";

@ObjectType({description: "The User model"})
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @Property({unique:false})
  username!: string;

  @Field()
  @Property()
  password!: string;

  @Field( type => [List], {nullable: true})
  @Property({ref: ()=>List, default:[]})
  todos?: Ref<List>[];

  @Field( type => [Tag], {nullable: true})
  @Property({ref:'Tag', default:[]})
  haveTags?: Ref<Tag>[];
}

export const UserModel = getModelForClass(User);