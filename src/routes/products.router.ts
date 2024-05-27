import Router from 'express'
import { deleteProductbyid, getProduct, getProductbyid, postProduct } from '../controllers/products.controller'

export const productroute = Router()

productroute.route("/").get(getProduct)
productroute.route("/:id").get(getProductbyid)
productroute.route("/:id").delete(deleteProductbyid)
productroute.route("/").post(postProduct)
