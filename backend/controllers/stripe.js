require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE__SECRET);
const endpointSecret =
  "whsec_2cb15a2a9ffada4ff6fbf6215b532954350854fdf106d058434d2ec6df5a23b2";

const verifyIdendity = async (req, res) => {
  //pass userId to the metadata
  try {
    const verificationSession =
      await stripe.identity.verificationSessions.create({
        type: "document",
        metadata: {
          user_id: "{{userId}}",
        },
        options: {
          document: {
            require_live_capture: true,
            require_matching_selfie: true,
            allowed_types: ["driving_license", "passport", "id_card"],
          },
        },
      });
    const url = verificationSession.url;
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

  // Handle the event
  if (event.type === "identity.verification_session.verified") {
    //update user function
  }

  const verificationSession = event.data.object;

  //create a user field where you can update the error message, clear it out when successful
  if (verificationSession.last_error?.code) {
    //update user function
  }

  response.send();
};

module.exports = {
  verifyIdendity,
  verifyIdendityHook,
};
