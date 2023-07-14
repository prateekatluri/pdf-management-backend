const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async getAll() {
    const response = await this.model.findAll();
    console.log(response);
    return response;
  }
  async getByPk(data) {
    const response = await this.model.findByPk(data);
    if (!response) throw new AppError(" id not found", StatusCodes.NOT_FOUND);
    return response;
  }
  async delete(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (response === 0)
      throw new AppError("No such id exists to delete", StatusCodes.NOT_FOUND);
    return response;
  }
  async update({ id, data }) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    if (response[0] === 0)
      throw new AppError("No such id exists", StatusCodes.NOT_FOUND);
    return response;
  }
}

module.exports = CrudRepository;
