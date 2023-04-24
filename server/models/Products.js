const mongoose=require('mongoose');

Products=new mongoose.Schema({
    id:{
        type:"string"
    },
    image:{
        type:'string',
    },
    description:{
        type:'string',
    },
    type:{
        type:'string'
     
    },
    brand:{
        type:"string"
    },
    size:{
        type:"string"
    },
    price:{
        type:"number"
    },
    category:{
        type:"string"
    }
});
module.exports=Products=mongoose.model('Products',Products);