import mongoose from "mongoose";

let cached = global.__mongooseCache;
if (!cached) {
  cached = global.__mongooseCache = { conn: null, promise: null };
}

const connect = async () => {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO;
  if (!uri) {
    throw new Error(
      "MONGO environment variable is not set. Add it in your hosting provider's settings."
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
};

export default connect;
