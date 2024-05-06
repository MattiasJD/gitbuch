const mongoose = require('mongoose');

//Připojení k DB - connection string s přímým připojením do databáze s názvem UHK
mongoose.connect('mongodb://127.0.0.1:27017/haha');

//Definice schématu (collection), která se při neexistenci vytvoří v připojené databázi
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    count: {
        type: Number,
    },
    state: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
    }

});

const ItemModel = mongoose.model('Item', itemSchema);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

class Mongo {
    constructor() {
        //prostor pro tvorbu indexu atp.
    }

    async createItem(doc) {
        const item = new ItemModel(doc);
        return await item.save();
    }

    async updateItem(id, doc) {
        return ItemModel.findByIdAndUpdate(id, doc, {
            new: true
        });
    }

    async getItem(id) {
        return ItemModel.findById(id);
    }

    async listItem(doc) {
        let {content, count, state, createdAt} = doc;
        let query = {};
        if (content) {
            query.content = {$regex: content, $options: "i"};
        }
        if (count) {
            query.count = count;
        }
        if (state) {
            query.state = {$regex: state, $options: "i"};
        }
        if (createdAt) {
            query.createdAt = {$regex: createdAt, $options: "i"};
        }
        return ItemModel.find(query);
    }

    async deleteItem(id) {
        return ItemModel.findByIdAndDelete(id);
    }

}

module.exports = new Mongo();
