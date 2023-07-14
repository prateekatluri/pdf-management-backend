const {Comment} = require('../models')
const CrudRepository = require("./crud-repository")
const sequelize = require("sequelize")

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment)
    }
    async getAllComments(data) 
    {
        const response = await Comment.findAll({ where : data})
        return response;
    }
}

module.exports = CommentRepository