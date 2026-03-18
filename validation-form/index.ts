import express, { Express } from "express";

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/",(req,res)=>{
    let email = req.body.email;
    console.log(email);
    
})


app.listen(app.get("port"), () => {
  console.log("Server started on http://localhost:" + app.get("port"));
});
