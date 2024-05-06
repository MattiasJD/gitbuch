const ItemMongo = require("../database/mongo");

class ShoppingItemModel {

    constructor() {
    }

    async createItem(doc) {
        if (!doc.content) throw new Error('Item content is required');
        if (!doc.state) throw new Error('Item state is required');
        if (doc.count <= 0) throw new Error('Item count must be at least 1');

        if (!doc.state) {
            throw new Error('Item count must be at least 1');
        }

        return await ItemMongo.createItem(doc);
    }

    async updateItem(id, doc) {
        const item = await ItemMongo.getItem(id);
        if (!item) throw new Error('Item not found');

        if (doc.count) {
            if (doc.count <= 0) throw new Error('Item count must be at least 1');
        }

        return await ItemMongo.updateItem(id, doc);
    }

    async getItem(id) {
        const item = await ItemMongo.getItem(id);
        if (!item) throw new Error('Item not found');
        return item;
    }

    async listItems(doc) {
        return await ItemMongo.listItem(doc);
    }

    async deleteItem(id) {
        const item = await ItemMongo.getItem(id);
        if (!item) throw new Error('Item not found');

        return await ItemMongo.deleteItem(id);
    }
}

module.exports = new ShoppingItemModel();
