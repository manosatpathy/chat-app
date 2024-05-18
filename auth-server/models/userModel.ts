import mongoose from "mongoose";

interface User {
  name: string;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: "String", required: true, unique: true },
  username: { type: "String", required: true },
  password: { type: "String", required: true },
});

const User = mongoose.model<User>("User", userSchema);

export default User;
