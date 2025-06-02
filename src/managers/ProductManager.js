
const ProductModel = require("../models/Product");

class ProductManager {
  async getProducts({ limit = 10, page = 1, sort, query }) {
    const filter = {};

    if (query) {
      if (["true", "false"].includes(query)) {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      lean: true,
    };

    if (sort === "asc") options.sort = { price: 1 };
    if (sort === "desc") options.sort = { price: -1 };

    return await ProductModel.paginate(filter, options);
  }

  async getProductById(id) {
    return await ProductModel.findById(id).lean();
  }

  async addProduct(product) {
    return await ProductModel.create(product);
  }

  async updateProduct(id, updatedFields) {
    return await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true }).lean();
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

module.exports = ProductManager;
