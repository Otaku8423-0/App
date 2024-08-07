const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "App5";

MongoClient.connect(url, (error, result) => {
    if (error) {
        console.log("error has occured");
    }
    console.log("All Success");
    const db = result.db(dbName);
    // insert One 2:
    // person 1:
    db.collection("task")
        .insertOne({
        name: "Moo islam",
        age: 18,
        })
        .then((data) => console.log(data.insertedId))
        .catch((error) => console.log(`Error while insert data: ${error}`));
    // person 2:  
    db.collection("task")
        .insertOne({
        name: "ahmed islam",
        age: 16,
        })
        .then((data) => console.log(`inserted id: ${data.insertedId}`))
        .catch((error) => console.log(`Error while insert data: ${error}`));

    //   insertMany 10 => 5 {age: 27}
    db.collection("task")
        .insertMany([
        { name: "mohamed islam", age: 20 },
        { name: "Ali Hassan", age: 22 },
        { name: "osama Mohamed", age: 24 },
        { name: "Hassan Ahmed", age: 26 },
        { name: "alaa Ali", age: 28 },
        { name: "Youssef Salah", age: 30 },
        { name: "khaled Mahmoud", age: 32 },
        { name: "Omar Said", age: 34 },
        { name: "Khaled Nabil", age: 36 },
        { name: "shady Tarek", age: 38 },
        { name: "isalm maged", age: 40 }
        ])
        .then((data) => console.log(`Inserted count: ${data.insertedCount}`))
        .catch((error) => console.log(`Error while insert data: ${error}`));

    // find all 27y:
    db.collection("task")
        .find({ age: 27 })
        .toArray()
        .then((data) => console.log(data))
        .catch((error) => console.log(`Error while find data: ${error}`));

    // find 3 presons 27y:
    db.collection("task")
        .find({ age: 27 })
        .limit(3)
        .toArray()
        .then((data) => console.log(data))
        .catch((error) => console.log(`Error while find data: ${error}`));

    // updateMany 4 presons name => not working
    db.collection("task")
        .updateMany({}, { $set: { name: "OmarHifnawy" } }, { limit: 4 })
        .then((data) => console.log(`Modified count: ${data.modifiedCount}`))
        .catch((error) => console.log(`Error while updating data: ${error}`));

    // updateMany 4 presons age => not working
    db.collection("task")
        .updateMany({}, { $inc: { age: 2 } }, { limit: 4 })
        .then((data) => console.log(`Modified count: ${data.modifiedCount}`))
        .catch((error) => console.log(`Error while updating data: ${error}`));

    // updateMany all persons inc 10y:
    db.collection("task")
        .updateMany({}, { $inc: { age: 10 } })
        .then((data) => console.log(`Modified count: ${data.modifiedCount}`))
        .catch((error) => console.log(`Error while updating data: ${error}`));

    // deleteMany age: 41 persons:
    db.collection("task")
        .deleteMany({ age: 41 })
        .then((data) => console.log(`Deleted count: ${data.deletedCount}`))
        .catch((error) => console.log(`Error while deleting data: ${error}`));
});