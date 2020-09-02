const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const queschema=new Schema({
    que:{
        type:String,
        required:true
    },
    field:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
},{timestamps:true});
const Question=mongoose.model('Question',queschema);
module.exports= Question;
