import express from "express";
import {
    createItem,
    deleteItem,
    getItemById,
    listItems,
    updateItem,
} from "../controllers/ItemController.js";
import { isAdmin, isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin, createItem);

router.get("/list", listItems);

router
    .route("/:id", isAdmin)
    .get(getItemById)
    .put(updateItem)
    .delete(deleteItem);

export default router;
