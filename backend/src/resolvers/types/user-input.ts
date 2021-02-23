import {InputType, Field,ID} from "type-graphql";
import {Length} from "class-validator";
import {User} from "../../entities/User";
import {ObjectId} from "mongodb";

@InputType()
export class UserInput implements Partial<User> {
  @Field(type => String)
  username!: string;

  @Field(type => [String], { nullable: true })
  todos?: string[];
}