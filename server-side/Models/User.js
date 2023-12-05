const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    cartProducts: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            productName: {
                type: String
            },
            productStock: {
                type: Number
            },
            productPrice:{
               type: Number
            },
            productSize: {
                type: String
            },
            productImageUrl: {
                type: String
            }
        }
    ]
}, { collection: 'usersData' });

const UserModel = mongoose.model("usersData", UserSchema);
module.exports = UserModel;
