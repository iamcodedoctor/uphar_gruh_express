import {create, getById, list, remove, update} from "../services/ItemService.js";

/**
 * controller to create a new menu Item
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
export const createItem = async (req, res, next) => {
    try {
        const {title, price} = req.body;
        const response = await create({title, price})
        return res.status(201).json({
            success: true,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Controller to get all menu items
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
export const listItems = async (req, res, next) => {
    try {
        const page = req.query.page || 0
        const limit = req.query.limit || 50
        const response = await list({page, limit})
        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Controller to get specific menu item by its id
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
export const getItemById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await getById(id)
        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Controller to update a menu Item
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
export const updateItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await update(id, data);
        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Controller to delete a menu item
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
export const deleteItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await remove(id)
        return res.status(200).json({
            success: true,
            message: response
        })
    } catch (error) {
        next(error)
    }
}