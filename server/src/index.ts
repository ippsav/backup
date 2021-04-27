import * as express from "express";
import user from "./routes/user";
import * as cors from "cors";

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", user);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
