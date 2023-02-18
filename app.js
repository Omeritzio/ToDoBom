var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


main().catch(err => console.log(err));

async function main() {
    mongoose.set("strictQuery", false);
    const uri = "mongodb+srv://ToDoBom:WetgVPwRGY0DuJCG@todobom.ohp9sli.mongodb.net/ToDoBom?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
        const collection = client.db("ToDoBom").collection("items");
        // perform actions on the collection object
        client.close();
      });
    await listDatabases(client);
    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
    async function listDatabases(client){
        databasesList = await client.db().admin().listDatabases();
     
    };
    await mongoose.connect(uri);


}

const itemSchema = {
    name: String,
};

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({name: "Insert Task: "});

const d = [item1];
Item.insertMany(d, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Successfully save items to database");
    }
});

var i1 = [];

app.get("/list", function(req, res){
    Item.find({}, function(err,f) {
            if(f.length === 0) {
                Item.insertMany(d, function(err){
                    if(err){
                        console.log(err);
                    } else {

                        console.log("Successfully save items to database");
                        
                        
                    }
                });
                res.redirect("/list");
            } else {
                res.render("list", {newListItem:f});
            }

    });
});


app.post("/list", function(req, res){
    i = req.body.n;
    const item = new Item({
        name:i,
    });
    item.save();
    res.redirect("/list");
});


app.post("/delete", function (req, res) {
    Item.findByIdAndRemove(req.body.checkbox, function (err) {
      if (!err) {
        console.log("Successfully deleted");
        res.redirect("/list");
      }
    });
  });
  

app.listen(3000, function(){
    console.log("listening on port 3000");
});




app.get('/',(req, res)=>{
    res.render('title.ejs');
})