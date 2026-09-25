// import User from "../models/User.js"
// import bcrypt from "bcrypt";
// import 'dotenv/config'


// export const seed = async () => {
//     try {
//         const existAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL })

//         if (existAdmin) {
//             console.log('admin exist');

//             return
//         }

//         const hashPass = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
//         await User.create({
//             name: 'Admin',
//             email: process.env.ADMIN_EMAIL,
//             password: hashPass,
//             role: 'admin'
//         })

//         console.log('admin creation successfull');


//     } catch (error) {
//         console.log(error.message);

//     }
// }


import "dotenv/config";
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import User from "../models/User.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");

    const existAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashPass = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashPass,
      role: "admin",
    });

    console.log("Admin creation successful");
  } catch (error) {
    console.error("Admin seed failed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();