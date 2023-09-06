const sqlDB = require('./db_connect')

const Restaurant = function(restaurant){
    this.name = restaurant.name
    this.type = restaurant.type
    this.image = restaurant.image
}


Restaurant.create = (newRestaurant, result) =>{
    const q = "INSERT INTO restaurants SET ?"
    sqlDB.query(q,newRestaurant ,(err,res)=>{
        if(err){
            console.log(err);
            return result(err,null)
        }
        console.log("inserted : "+res.insertId);
        return result(null,{restaurantID:res.id , ...newRestaurant})
    })
}

Restaurant.getAll = (result) =>{
    const q = "SELECT * FROM restaurants"
    sqlDB.query(q,(err,res)=>{
        if(err){
            console.log(err);
            return result(null,err)
        }
        console.log("getAll hit");
        return result(res,null)
    })
}

Restaurant.getByID = (id , result) =>{
    const q = "SELECT * FROM restaurants WHERE id = ?"
    sqlDB.query(q,id,(err,res)=>{
        if(err){
            console.log(err);
            return result(null , err)
        }
        
        if(res.length){
            console.log("get restaurant ID : " + id);
            return result(res,null)
        }else{
            const errMSG = new Error('ID NOT FOUND')
            return result(null,errMSG)
        }
    })
}

Restaurant.updateByID = ( id, newRestaurant , result)=>{
    sqlDB.query("SELECT * FROM restaurants WHERE id = ?",id , (err,res) =>{
        if(err){
            console.log(err);
            return result(null , err)
        }
        if(res.length){
            const q = "UPDATE restaurants SET ? WHERE id = ?"
            sqlDB.query(q,[newRestaurant,id],(err,res)=>{
                if(err){
                    console.log(err);
                    return result(null , err)
                }
                const successMSG = `updated id : ${id}` 
                console.log(successMSG);        
                return result(successMSG,null)
            })
        }else{
            const errMSG = new Error('ID NOT FOUND')
            return result(null , errMSG)
        }
    })
}

Restaurant.deleteByID = (id , result)=>{
    sqlDB.query("SELECT * FROM restaurants WHERE id = ? " , id , (err , res)=>{
        if(err){
            console.log(err);
            return result(null ,err)
        }
        if(res.length){
            sqlDB.query("DELETE FROM restaurants WHERE id = ? " , id , (err , res) =>{
                if(err){
                    console.log(err);
                    return result(null , err)
                }
                const successMSG = `deleted id : ${id}`
                console.log(successMSG);
                return result(successMSG,null)
            })
        }else{
            const errMSG = new Error('ID NOT FOUND')
            return result(null,errMSG)
        }
    })
    
}

module.exports = Restaurant