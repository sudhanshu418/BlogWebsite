import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errorResponse = (message, status) =>
  NextResponse.json({ error: message }, { status });

export const POST = async (request) => {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const { name, email, password } = payload || {};

  if (!name || !email || !password) {
    return errorResponse("Name, email, and password are required.", 400);
  }
  if (!EMAIL_RE.test(email)) {
    return errorResponse("Please enter a valid email address.", 400);
  }
  if (password.length < 6) {
    return errorResponse("Password must be at least 6 characters.", 400);
  }

  try {
    await connect();
  } catch (err) {
    console.error("[register] db connect failed:", err);
    return errorResponse(
      "Could not reach the database. Please try again later.",
      503
    );
  }

  try {
    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { name }],
    });
    if (existing) {
      return errorResponse(
        "An account with that name or email already exists.",
        409
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    }).save();

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[register] failed:", err);
    if (err?.code === 11000) {
      return errorResponse(
        "An account with that name or email already exists.",
        409
      );
    }
    return errorResponse("Could not create account. Please try again.", 500);
  }
};
