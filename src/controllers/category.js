import Category from "../models/category.js";
import { categoryValid } from "../validation/category.js";

export const getAll = async (req, res) => {
  try {
    const data = await Category.find();
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    return res.status(200).json({
      message: "Successfully!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const { name, price, desc } = req.query;
    console.log(name);
    const data = await Category.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    return res.status(200).json({
      message: "Successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = categoryValid.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Category.create(req.body);
    if (!data) {
      return res.status(400).json({
        message: "Failed!",
      });
    }
    return res.status(200).json({
      message: "Successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = categoryValid.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      abortEarly: false,
    });
    if (!data) {
      return res.status(400).json({
        message: "Failed!",
      });
    }
    return res.status(200).json({
      message: "Successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: "Failed!",
      });
    }
    return res.status(200).json({
      message: "Successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error,
    });
  }
};
