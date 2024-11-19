var {model, Schema} = require('mongoose');

var ProjectSchema = new Schema({
    category:{
        type:String
    },
    cover:{
        type:String,
    },
    screenshot:{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    client:{
        type:String,
    },
    projectType:{
        type:String,
    },
    date:{
        type:String,
    },
    address:{
        type:String,
    },
    liveUrl:{
        type:String,
    },
    features:{
        type:Array
    }
    });
    
    module.exports = new model("Project", ProjectSchema);