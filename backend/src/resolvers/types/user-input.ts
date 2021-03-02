import {InputType, Field,ID} from "type-graphql";
import {User} from "../../entities/User";

@InputType()
export class UserInput implements Partial<User> {
  @Field(type => String)
  username!: string;

  @Field(type => [String], { nullable: true })
  todos?: string[];
}