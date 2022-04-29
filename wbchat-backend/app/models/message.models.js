const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        message: {
            text: { type: String, required: true },
          },
          users: Array,
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
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