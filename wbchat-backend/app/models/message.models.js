const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
       content: {
            type: String,
            required: true,
            trim: true,
       },
       to: String,
       from: String,
    },
    {
        timestamps: true,
    }
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("message", schema);