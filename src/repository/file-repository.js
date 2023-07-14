const {File} = require('../models')
const CrudRepository = require("./crud-repository")
const sequelize = require("sequelize")
const { Op } = require("sequelize");
class FileRepository extends CrudRepository {
    constructor() {
        super(File)
    }
    async getUserFiles(data){
    const response = await this.model.findAll(data);
    // console.log(response);
    return response;
    }

    async getAllSharedFiles(data) {
    
    const response = await File.findAll({
    where: {
        sharedWith: {
            [Op.like]: `%\\"@${data}@%`,
        },
    },
    });
        return response;
    }
}
module.exports = FileRepository