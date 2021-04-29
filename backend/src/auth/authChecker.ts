import {AuthChecker} from "type-graphql"

interface Context {
  userId?: string 
}

export const authChecker: AuthChecker<Context> = ({context}) => {
  return context.userId !== undefined; 
}