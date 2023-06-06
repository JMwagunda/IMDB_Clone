const jwt = require("jsonwebtoken");


const isAdminAuthourized = (req,res, next) =>{
    const token = req.headers.authourization.split("").splice(7).join("");

    if(!token){
        return res.send("No token found")
    }

    console.log(token);
    const data = verifyToken(token)
    console.log(data)

    if(true){
        return res.send("errors occured");
    }
    next()
}

const verifyToken = (token)=>{
    jwt.verify(token,"judd", (err, decoded)=>{
        if(err){
            console.log(err);
            return null
        }
        console.log(decoded)
        
        if(decoded.role == "admin")
        {
            next()
        }
        if(decoded.role !== "admin"){
            return res.send("you are not authourized to perform this action")
        }
    })
}




module.exports = isAdminAuthourized;