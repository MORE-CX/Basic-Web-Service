const mongoose=require('../DbConnector');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const UserSchema = new Schema({
  _id: ObjectId,
  email: String,
  password: String
},{collection:'user'});

const UserDbModel=mongoose.model('user',UserSchema);
module.exports=UserDbModel;