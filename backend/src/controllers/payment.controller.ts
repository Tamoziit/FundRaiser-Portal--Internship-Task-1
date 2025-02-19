import { Request, Response } from "express";
import stripe from "../services/stripeInit";
import Stripe from "stripe";

export const paymentHandler = async (req: Request, res: Response) => {
    const baseUrl = process.env.BASE_URL;
    const { id, name, code, amount, profilePic } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: name,
                            description: `${code} - External Donation`,
                            images: profilePic ? [profilePic] : []
                        },
                        unit_amount: amount * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            phone_number_collection: {
                enabled: true
            },
            success_url: `${baseUrl}/donate/complete-payment?session_id={CHECKOUT_SESSION_ID}&id=${id}&name=${name}&referenceCode=${code}&amount=${amount}&type=External`,
            cancel_url: `${baseUrl}/donate/cancel-payment?reason=user_cancelled`,
            metadata: {
                orderId: id,
            },
            allow_promotion_codes: true
        });

        res.json({ url: session.url });
    } catch (err) {
        console.log("Error in paymentHandler", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const selfPaymentHandler = async (req: Request, res: Response) => {
    const baseUrl = process.env.BASE_URL;
    const { amount, profilePic } = req.body;

    try {
        if (!req.user?.email) {
            res.status(400).json({ error: "User email is required" });
            return;
        }

        const userId = req.user._id.toString();

        // Creating a Stripe customer
        const customer = await stripe.customers.create({
            email: req.user.email,
            phone: req.user.mobileNo,
            name: req.user.name,
        });

        // Creating a Stripe Checkout Session
        const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
            customer: customer.id, // Attaching the created customer
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: req.user.name,
                            description: `${req.user.code} - Self Donation`,
                            images: profilePic ? [profilePic] : [],
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${baseUrl}/donate/complete-payment?session_id={CHECKOUT_SESSION_ID}&id=${userId}&name=${req.user.name}&referenceCode=${req.user.code}&amount=${amount}&type=Self`,
            cancel_url: `${baseUrl}/donate/cancel-payment?reason=user_cancelled`,
            metadata: {
                orderId: userId,
            },
            allow_promotion_codes: true,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Error in selfPaymentHandler", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};