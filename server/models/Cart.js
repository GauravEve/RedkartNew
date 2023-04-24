const mongoose=require('mongoose');

Cart=new mongoose.Schema({
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
    },
    quantity:{
        type:"number"
    }
    
});
module.exports=Cart=mongoose.model('Cart',Cart);