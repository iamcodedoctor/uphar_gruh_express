import express from "express";
import {createItem, deleteItem, getItemById, listItems, updateItem} from "../controllers/ItemController.js";
import {isAuthenticated} from "../middlewares/userAuthentication.js";

const router = express.Router();

router.post('/create', isAuthenticated, createItem)

router.get('/list', listItems)

router.route("/:id")
    .get(getItemById)
    .put(updateItem)
    .delete(deleteItem)

export default router;
