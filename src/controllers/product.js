import Product from "../models/product.js";
import { productValid } from "../validation/product.js";

export const getList = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };

    const data = await Product.find().populate("category");
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    return res.status(200).json({
      message: "Get the product list successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    return res.status(200).json({
      message: "Get product successfully!",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(404).json({
        message: "Create Product failed!",
      });
    }
    return res.status(200).json({
      message: "Create Product Successful!",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Updata Product Failed!",
      });
    }
    return res.status(200).json({
      message: "Updata Product Success!",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: "Delete Product Failed!",
      });
    }
    return res.status(200).json({
      message: "Delete Product Success!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.name,
      message: error,
    });
  }
};
