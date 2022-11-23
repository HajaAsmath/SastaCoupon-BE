
const express = require("express");
const router = express.Router();
const path = require('path')
const app = express();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')

// app.use(cors())
// app.use(bodyParser.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_NpKUjWehxc13rP',
	key_secret: 'XutQhK8ic37ngBLlmN2A499v'
})

router.post('/', async (req, res) => {
	
		const payment_capture = 1
	const amount = 499 * 100;
	const currency = 'INR'

	const options = {
		amount: amount,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})


module.exports = router;