import {Resolver, Mutation, Arg, Query, FieldResolver, Root, ID} from "type-graphql";
import { UserModel} from "../entities/User";
import { AuthResult} from "../entities/Auth";

@Resolver(of => AuthResult) 
export class AuthResolver {
  @Query(_returns => AuthResult, {nullable: true})
  async userSignIn(
    @Arg("username") username: string
  ) {
    const result = await UserModel.find({username: username});
    if(result) {
      //check for password
      return {
        token: result[0].id
      }
    }
    return {
      message:"Something is wrong"
    }
  }

  @Mutation(_returns => AuthResult, {nullable: true})
  async userSignUp(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    const result = await UserModel.create({username});
    return {
      token: result.id
    }
  }

}


