const stripe = require("stripe")(process.env.STRIPE__SECRET);
const endpointSecret = process.env.STRIPE__ENDPOINT__SECRET;
const User = require("../models/user");

const createStripeAccount = async (req, res) => {
  const { userId } = req.body;

  try {
    const account = await stripe.accounts.create({ type: "standard" });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "http://localhost:3000/auth/login",
      return_url: "https://dashboard.stripe.com/login",
      type: "account_onboarding",
    });

    await User.findByIdAndUpdate({ _id: userId }, { $set: { stripeId: account.id } });

    const url = accountLink.url;
    res.send({ url });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const verifyIdendityHook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  response.send();
};

module.exports = {
  createStripeAccount,
  verifyIdendityHook,
};
