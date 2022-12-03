const { insertContactUsInfo } = require("../repos/ContactUsRepo");
const logger = require("../utils/logger");


const submitContactUsform = async (req, res) => {
    const contactUsForm = req.body;
    await insertContactUsInfo(contactUsForm).then(result => {
        if(result[0].affectedRows === 1) { 
            res.status(200).send();
        }
    }).catch((err) => {
        logger.error(err);
        res.status(500).send(err);
    });
}

module.exports = {submitContactUsform}