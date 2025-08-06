import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const carSchema = new mongoose.Schema({
    owner: {type: ObjectId, ref: 'User'},
    brand: {type: String, required: true},
    model: {type: String, required: true},
    image: {type: String, required: true},
    year: {type: Number, required: true},
    category: {type: String, required: true},
    seating_capacity: {type: Number, required: true},
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true }, // Main pickup location/city
    address: {
        street: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String },
        landmark: { type: String }
    },
    description: { type: String, required: true },
    isAvaliable: {type: Boolean, default: true}
},{timestamps: true})

const Car = mongoose.model('Car', carSchema)

export default Car
