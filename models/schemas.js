const userSchema = {
  userId:String,
  username:String,
  password:String,
  firstName: String,
  lastName:String,
  balance:Number,
  location:String,
  picture:String,
  // tasksRequested:Array,
  // tasksCompleted:Array,
}

const taskSchema = {
  taskId:String,
  userAsk:String,
  userDo:String,
  time:Number,
  title:String,
  description:String,
  // transactionId:String,
  status:String,
}
//
// const transactionSchema = {
//   transactionId:String,
//   taskId:String,
//   status:String,
//   hours:Number,
//   transferFrom:String,
//   transferTo:String,
// }
