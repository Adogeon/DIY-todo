 import {connect} from "mongoose";

 export const connectDb = async () => {
   try {
     await connect('mongodb://localhost')
     console.log("Connected to mongodb database")
   } catch (error) {
     console.error(error)
   }
 }