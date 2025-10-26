import mongoose from "mongoose";
const uri =
  "mongodb+srv://pierre:j5aSBtn98LaTO6As@cluster0.pwfu5cv.mongodb.net/concessionnaire?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
export async function connectDb() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("tu es bien connecté à MongoDB!");
  } catch (error) {
    console.log(error);
  }
}
