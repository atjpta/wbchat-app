const mongoose = require("mongoose");
const db = require("../models");
const Message = db.message;
const {BadRequestError} = require("../errors");
const { message } = require("../models");


exports.create = async (req, res, next) => {
    if(!req.body.content) {
        return next(new BadRequestError(400, "tin nhắn không được để trống"));
    }


    const message = new Message ({
        content: req.body.content,
        to: req.body.to,
        from: req.body.from,
    })

    try {
        const document = await message.save();
        return res.send(document);
    }
    catch (error) {
        return next (
            new BadRequestError (
                500,
                "có lỗi khi thêm message vào csdl"
            )
        );
    }
};

exports.findMessagesForUser = async (req , res, next) => {
    const {id} = req.params;
   
    try {
        const document = await message.find({
            $or: [{to: id}, {from: id}]});
        return res.send(document);
    }
    catch (error) {
        return next (
            new BadRequestError (
                500,
                "có lỗi khi lấy message"
            )
        );
    }
}


