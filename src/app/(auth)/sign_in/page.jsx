"use client";

import React from 'react';
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const signInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data:signInData, error } = await authClient.signIn.email({
    email: data.email, // required, The email address of the user.
    password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
     callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
});
    
    console.log(data);
  };

  const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};


    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 p-4">
              <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          {/* <Check /> */}
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        <Button onClick={signIn} type="button" variant="secondary" onPress={() => authClient.signIn.google({ callbackURL: "/" })}>
          Sign in with Google
        </Button>
      </div>
    </Form>
        </div>
    );
} ;              
   

export default signInPage;