const userSchema = require("../models/userModel");

module.exports.register = async (req, res) => {
  try {
    let data = req.body;
    const { firstName,lastName, phone, email,resume } = data;
    let existingmail = await userSchema.findOne({ email , phone });
    
    if (existingmail ) {
      return res.status(409).send({ status:false, msg: "You have already registerd, Please wait" });
    }
    await userSchema.create(data)
    return res
      .status(201)
      .send({status:true, msg: "Details submitted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

