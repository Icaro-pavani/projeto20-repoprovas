import app from "./app.js";

import dotenv from "dotenv";
dotenv.config();

const port: number = +process.env.PORT || 5000;

app.listen(port, () => console.log(`API online on port ${port}`));
