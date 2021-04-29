import {Resolver, Mutation, Arg, Query, FieldResolver, Root, ID} from "type-graphql";
import { UserModel} from "../entities/User";
import { AuthResult} from "../entities/Auth";
import jsonwebtoken, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (id: string) => {
  return jsonwebtoken.sign({
    userId: id
  }, 'TypegraphQL', {expiresIn: '30m'})
}

const generateRefreshToken = (id: string) => {
  return jsonwebtoken.sign({
    userId: id
  }, 'RefreshSECRET', {expiresIn: '7d'})
}
@Resolver(of => AuthResult) 
export class AuthResolver {
  @Query(_returns => AuthResult, {nullable: true})
  async userSignIn(
    @Arg("username", {nullable: false}) username: string,
    @Arg("password", {nullable: false}) password: string
  ) {
    const result = await UserModel.findOne({username: username});
    if(result) {
      //check for password
      const checkPassword = await bcrypt.compare(password, result.password);
      if(checkPassword) {
        return {
          token: generateToken(result.id),
          refresh: generateRefreshToken(result.id)
        }
      } else {
        throw new Error("Password doesn't match")
      }
    }
    throw new Error("Can't find this username")
  }

  @Mutation(_returns => AuthResult)
  async refreshLogin( 
    @Arg("token", {nullable: false})token : string,
  ) {
    try {
      const decoded: any = await jsonwebtoken.verify(token, 'RefreshSECRET')
      const user = await UserModel.findById(decoded.id);
      if(user) {
        return {
          token: generateToken(user.id),
          refresh: generateToken(user.id)
        }
      } else {
        throw new Error('Invalid token')
      }
    } catch(err) {
      if(err.name === TokenExpiredError) throw new Error('Token expired')
      if(err.name === JsonWebTokenError) throw new Error('Invalid token')
      throw new Error(err.message);
    }
  }

  @Mutation(_returns => AuthResult, {nullable: true})
  async userSignUp(
    @Arg("username", {nullable: false}) username: string,
    @Arg("password", {nullable: false}) password: string
  ) {
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.create({username, password: hashPassword});
    return {
      token: generateToken(result.id),
      refresh: generateRefreshToken(result.id)
    }
  }
}


