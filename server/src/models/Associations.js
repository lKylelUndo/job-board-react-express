import { User } from "./User.js";
import { Job } from "./Job.js";
import { Profile } from "./Profile.js";
import { Application } from "./Application.js";
import { Employeer } from "./Employeer.js";

User.hasOne(Profile, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Application, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Application.belongsTo(User, {
  foreignKey: "userId",
});

User.hasOne(Employeer, {
  foreignKey: "userId",
});

Employeer.belongsTo(User, {
  foreignKey: "userId",
});
