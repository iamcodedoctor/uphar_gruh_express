import {Item} from "../models/Item.js";

/**
 * create a new Item
 * @param title
 * @param price
 * @returns {Promise<unknown>}
 */
export const create = ({title, price}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newItem = await Item.create({
                title,
                price
            })
            return resolve(newItem)
        } catch (error) {
            return reject(error)
        }
    })
}

/**
 * list menu items
 * @param page
 * @param limit
 * @returns {Promise<unknown>}
 */
export const list = ({page, limit}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const items = await Item.find().skip(page*limit).limit(limit).lean()
            return resolve(items);
        } catch (error) {
            return reject(error);
        }
    })
}

/**
 * get a specific menu item by id
 * @param id
 * @returns {Promise<unknown>}
 */
export const getById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const item = await Item.findById(id).lean()
            return resolve(item);
        } catch (error) {
            return reject(error);
        }
    })
}

/**
 * update a menu item
 * @param id
 * @param data
 * @returns {Promise<unknown>}
 */
export const update = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedItem = await Item.findByIdAndUpdate(id, data, {new: true})
            return resolve(updatedItem)
        } catch (error) {
            return reject(error);
        }
    })
}

/**
 * delete a menu item
 * @param id
 * @returns {Promise<unknown>}
 */
export const remove = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Item.findByIdAndDelete(id);
            return resolve("Menu Item deleted Successfully")
        } catch (error) {
            return reject(error);
        }
    })
}