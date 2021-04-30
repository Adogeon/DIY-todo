import {AuthChecker} from "type-graphql"

interface Context {
  user:{
    userId?: string
  }
}

export const authChecker: AuthChecker<Context> = ({context}) => {
  return context.user.userId !== undefined; 
}