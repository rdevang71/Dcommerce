import express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello this is home page')
})

app.get('/api/jokes',(req,res)=>{
    const Jokes = [
  { id: 1, title: "Name Game", content: "Why did the name refuse to change? Because it didn’t want to lose its identity!" },
  { id: 2, title: "Alias Issues", content: "Why don’t secret agents use their real names? Because they don’t want to get tagged in embarrassing childhood photos!" },
  { id: 3, title: "Lost Name", content: "I changed my name to 'Nobody'... So now when people say 'Nobody's perfect,' they're talking about me!" },
  { id: 4, title: "Name Pun", content: "Why did Tom name his dog ‘Stay’? So he could yell 'Come here, Stay!' and confuse everyone." },
  { id: 5, title: "Identity Crisis", content: "If you legally change your name to ‘Dad Jokes’, does that make every joke you tell a dad joke?" }
];

  res.send(Jokes);
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`)
})