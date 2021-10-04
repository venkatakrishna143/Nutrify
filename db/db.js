var mongoose = require('mongoose');
 var url = 'mongodb+srv://Krishna:Krishna@cluster0.rkcqt.mongodb.net/Nutrify?retryWrites=true&w=majority';
mongoose.connect(url, 
{
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useFindAndModify : false,
  useCreateIndex : true
},(err) => {
    if(err){
        console.log("DB connection unsuccessful");
    }
    else{
        console.log("DB connected");
    }
});

var usersSchema = new mongoose.Schema({
    username : {
        type : String,
        required : "Required",
        index : { unique: true }
    },
    email : {
        type : String,
        required : "Required",
        index : { unique: true }
    },
    password : {
        type : String,
        required : "Required"
    },
    calorie : {
        type : String,
    },
    meals : { 
        type : Array,
        default : []
    },
    isAdmin : { 
        type: Boolean, 
        default: false 
    }
});

mongoose.model("users", usersSchema);