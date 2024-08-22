const express = require("express");
const userRouter = require("./router/userRouter");
const taskRouter = require("./router/taskRouter");
const app = express();
const port = process.env.PORT || 3000;
require("./db/dbConniction");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
