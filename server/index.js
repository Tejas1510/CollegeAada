const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

/* Mongoose server link needs to be changed before deployment */
mongoose.connect("mongodb://localhost: 27017/CollegeAadaDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

/* Mongoose Schemas */
const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    no_comments: Number,
    author: String,
    timeStamp: Date,
    comments: [{
        author: String,
        authorId: String,
        comment: String,
        time: Date
    }]
});

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    type: String,
    questions: [String],
    answers: [String]
});

/* Mongoose Models */
const Question = mongoose.model("Question", questionSchema);
const User = mongoose.model("User", userSchema);

app.route("/").get((req, res)=> {
    if(req.query.questions) {
        const questionsQuery = JSON.parse(req.query.questions);
        Question.find({_id: {$in: questionsQuery}}, (error, questions) => {
            if(error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.send(questions);
            }
        });
    } else {
        Question.find({}, (error, questions) => {
            if(error) {
                console.log(error);
                res.sendStatus(500).send({msg: "Bad Request."});
            } else {
                res.send(questions);
            }
        });
    }    
})
.post((req, res) => {
    const {author, title, description} = req.body;
    const question = new Question({
        title: title,
        description: description,
        author: author,
        no_comments: 0,
        timeStamp: new Date(),
        comments: []
    });
    question.save((err, question) => {
        if(err) {
            res.send({msg: err});
        } else {
            res.send(question);
        }
    });
});

app.route("/login").get((req, res) => {
    const {userName, password} = req.query;
    User.findById(userName, (err, user) => {
        if(err) {
            console.log(err);
            res.send({msg: "Some Error Occured."});
        } else if(user) {
            if(user.password === password) {
                res.send({msg: "User present"});
            } else {
                res.send({msg: "Password invalid"});
            }
        } else {
            res.send({msg: "User not found"});
        } 
    });
});

app.route("/register").post((req, res) => {
    const {userId, name, type, email, password, questions, answers} = req.body;
    User.findById(userId, (err, user) => {
        if(err) {
            res.send(err);
        } else if(user) {
            res.send({msg: "This username already exists"});
        } else {
            const user = new User({
                _id: userId,
                name: name,
                email: email,
                password: password,
                type: type,
                questions: questions,
                answers: answers
            });
            user.save();
            res.send({msg: "User Registered"});
        }
    })
});

app.route("/user")
.get((req, res) => {
    const {userName} = req.query;
    User.findById(userName, (err, user) => {
        if(err) {
            res.send({msg: "Some Error Occured"});
        } else {
            res.send(user);
        }
    })
})
.post((req, res) => {
    const {questions, userId} = req.body;
    User.findByIdAndUpdate(userId, {$set: {questions: questions}}, {new: true}, (err, user) => {
        if(err) {
            res.send({msg: err});
        } else {
            res.send(user);
        }
    });
});

app.route("/question")
.get((req, res) => {
    const questionId = req.query.id;
    Question.findById(questionId, (err, question) => {
        if(err) {
            console.log(err);
        } else {
            res.send(question);
        }
    });
}).post((req, res) => {
    const questionId = req.body._id;
    const updatedComments = req.body.comments;
    const no_comments = req.body.no_comments;
    Question.findByIdAndUpdate(questionId, {$set: {comments: updatedComments, no_comments: no_comments}}, {new: true}, (err, question) => {
        if(err) {
            console.log(err);
        } else {
            res.send(question);
        }
    });
});

app.listen(process.env.PORT || 5000, () => console.log("Server started at port 5000"));