const { v4: uuidv4 } = require('uuid');
const uid = uuidv4();

const esewarequest = async(req,res)=>{
    res.render('esewarequest',{"uid":uid})
}

module.exports=esewarequest