exports.create_user = (req, res) => {
    res.send({ message: "create handler user" });
};

exports.findAll_user = (req, res) => {
    res.send({ message: "findAll handler user" });
};

exports.findOne_user = (req, res) => {
    res.send({ message: "fondOne handler user" });
};

exports.update_user = (req, res) => {
    res.send({ message: "update handler user" });
}

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};



