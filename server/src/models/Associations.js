import { User } from "./User.js";
import { Job } from "./Job.js";
import { Profile } from "./Profile.js";

User.hasOne(Profile, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
});
