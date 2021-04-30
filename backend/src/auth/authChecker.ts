import {AuthChecker} from "type-graphql"
import {GraphQLError} from 'graphql'

interface Context {
  user:{
    userId?: string
    err?
  }
}

export const authChecker: AuthChecker<Context> = ({context}) => {
    return context.user!== undefined; 
}