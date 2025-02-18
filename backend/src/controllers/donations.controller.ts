import { Request, Response } from "express";
import { DonationBody } from "../types";
import User from "../models/user.model";
import stripe from "../services/stripeInit";
import Donation from "../models/donation.model";
import Stripe from "stripe";
import { levels } from "../data/constants";

export const processDonation = async (req: Request, res: Response) => {
    try {
        const { id, session_id, amount }: DonationBody = req.body;

        let volunteer = await User.findById(id);
        const donor = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent.payment_method']
        });

        if (volunteer && donor) {
            const paymentIntent = donor.payment_intent as Stripe.PaymentIntent;

            const newDonation = new Donation({
                payment_intent_id: paymentIntent.id,
                volunteer_id: id,
                volunteer_name: volunteer.name,
                volunteer_email: volunteer.email,
                donor_name: donor.customer_details?.name,
                donor_email: donor.customer_details?.email,
                donor_mobileNo: donor.customer_details?.phone,
                amount: amount,
                code: volunteer.code,
                donationType: "External"
            });

            if (newDonation) {
                volunteer.raisedAmount += amount;
                volunteer.donations.push(newDonation._id);

                levels.forEach((level) => {
                    if (volunteer.raisedAmount >= level.start && volunteer.raisedAmount <= level.target) {
                        volunteer.level = level.level;
                    }
                });

                await Promise.all([newDonation.save(), volunteer.save()]);
            } else {
                res.status(400).json({ error: "Could not process payment, Refund will be processed within 5-7 days" });
                return;
            }

            res.status(200).json(newDonation);
        } else {
            res.status(400).json({ error: "Error in processing donation" });
        }
    } catch (error) {
        console.log("Error in processDonation controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getVolunteerInfo = async (req: Request, res: Response) => {
    try {
        const code = req.params.code;
        const volunteer = await User.findOne({ code }).select("-password");

        if (volunteer) {
            res.status(200).json(volunteer);
        } else {
            res.status(400).json({ error: "Couldn't fetch volunteer info" });
        }
    } catch (error) {
        console.log("Error in getVolunteerInfo controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyTransactions = async (req: Request, res: Response) => {
    try {
        const donationType = req.query.type as string;

        const user = await User.findById(req.user?._id);
        if (!user) {
            res.status(400).json({ error: "Couldn't find user" });
            return;
        }

        if (!user.donations || user.donations.length === 0) {
            res.status(200).json({ donations: [] });
            return;
        }

        let donations = await Donation.find({ _id: { $in: user.donations } });

        if (donationType) {
            donations = donations.filter(donation => donation.donationType === donationType);
        }

        res.status(200).json(donations);
    } catch (error) {
        console.error("Error in getMyTransactions controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};