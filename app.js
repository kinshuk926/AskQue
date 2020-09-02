const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const Question=require('./js/question');
const dburi= 'mongodb+srv://kinshuk926:kinshuk123@@cluster0.ho2qb.mongodb.net/Askque?retryWrites=true&w=majority';
mongoose.connect(dburi,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));
app.set('view engine','ejs');
app.use(express.static('css'));
app.use(express.static('images'));
app.use(express.static('js'));
app.use(express.static('snippets'));
app.use('/fonts',express.static(path.join(__dirname,'fonts')));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
res.render('index');
});

app.get('/home',(req,res)=>{
    res.redirect('/');
});

app.get('/question/home',(req,res)=>{
    res.redirect('/');
});

//showing all questions through home page button answer
app.get('/question',(req,res)=>{
    Question.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('question',{quest:result});
        })
        .catch((err)=>{
            console.log(err);
        })
});

//rendering everypage of each category which is asked
app.get('/question/:field',(req,res)=>{
    const id=req.params.field;
    //console.log(id);
    Question.find({field:id}).sort({createdAt:-1})
        .then(result=>{
            // console.log(result);
            res.render('question',{quest:result})
        })
        .catch(err=>{
            console.log(err);
        })
 
})

//anwer page
app.get('/question/:field/:id',(req,res)=>{
    const id=req.params.id;
    //console.log(id);
    Question.findById(id)
        .then(result=>{
            // console.log(result);
            res.render('queans',{quest:result})
        })
        .catch(err=>{
            console.log(err);
        })
})

//posting question
app.post('/',(req,res)=>{
    //console.log(req.body);
    const question=new Question(req.body);
    question.save()
        .then(()=>{
            res.render('index');
        })
        .catch((err)=>{
            console.log(err);
        })
})

//answer update
app.post('/question/:field/:id',(req,res)=>{
    const id=req.params.id;
    const x=req.params.field;
    Question.updateOne({_id:id},{$set:req.body})
        .then(()=>{
            res.redirect('/question/');
        })
        .catch((err)=>{
            console.log(err);
        })
})


app.use((req,res)=>{
    res.status(404).send('<p>Error 404</p>');
});