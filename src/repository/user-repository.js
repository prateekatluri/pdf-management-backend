const {User} = require('../models')
const CrudRepository = require("./crud-repository")
const sequelize = require("sequelize")

class UserRepository extends CrudRepository {
    constructor() {
        super(User)
    }
    async getUserByemail(data) {
       const user_exists =  await User.findOne({where:{ email: data}})
       return user_exists
    }
}

module.exports = UserRepository