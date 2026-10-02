import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';

const client = new MongoClient(process.env.BETTER_AUTH_CLIENT_ID);
const db = client.db("better-auth");

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: true,
  }, 

 socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID , 
            clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET, 
        }, 
    },

     emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      void resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to:user.email,
      subject: 'Hello world',
      html: `<strong>Verify your email by clicking <a href="${url}">here</a></strong>`,
    });
    },
    sendOnSignIn:true, // optional, default is false. If true, a verification email will be sent on every sign in.
    autoSignInAfterVerification: true, // optional, default is false. If true, the user will be automatically signed in after verifying their email.
    expiresIn: 60 * 6, // optional, default is 24 hours. The time in seconds before the verification token expires.
  },

  database: mongodbAdapter(db, {
    
    client
  }),
});



