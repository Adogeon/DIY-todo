import {InputType, Field,ID} from "type-graphql";
import {Length} from "class-validator";
import {User} from "../../entities/User";
import {ObjectId} from "mongodb";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  username!: String;

  @Field({ nullable: true })
  todo_id: ObjectId[] = [];
  
}