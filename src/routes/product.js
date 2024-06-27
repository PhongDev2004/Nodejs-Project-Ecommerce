import express from "express";
import {
  create,
  getDetail,
  getList,
  remove,
  update,
} from "../controllers/product.js";
import {
  checkAdminLastest,
  checkisAdmin,
} from "../middlewares/checkPermission.js";
const routerProduct = express.Router();

// routerProduct.get("/", getList);
// routerProduct.get("/:id", getDetail);
// routerProduct.post("/", checkisAdmin, checkAdminLastest, create);
// routerProduct.put("/:id", checkisAdmin, update);
// routerProduct.delete("/:id", checkisAdmin, remove);

routerProduct.get("/", getList);
routerProduct.get("/:id", getDetail);
routerProduct.post("/", create);
routerProduct.put("/:id", update);
routerProduct.delete("/:id", remove);

export default routerProduct;
