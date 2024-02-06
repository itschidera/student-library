
const libraryBooks=[
    {title:"Harry Potter", author:"J.K Rowling", isAvailable:true, borrowedBy:""},
    {title:"Rich Dad Poor Dad", author:"Robert T. Kiyosaki", isAvailable:true, borrowedBy:""},
    {title:"Atomic Habits", author:"James Clear", isAvailable:true , borrowedBy:""},
    {title:"The Awe of God", author:"John Bevere", isAvailable:true , borrowedBy:""},
]
const express = require('express');

const app = express();

const path =require('path');
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "index.html"))
 });

 app.get('/see-all', (req, res) => {
    let htmlOutput = '<style>li {font-weight: bold;}</style>'
    for (let book of libraryBooks) {
        htmlOutput += `
        <ul>
            <li>Book: ${book.title}</li>
            <li>Author: ${book.author}</li>
            <li>Is Available: ${book.isAvailable}</li>
            <li>Borrowed By: ${book.borrowedBy}</li>
            <br>
        </ul>
        `;
    }
    const goHome =  ` <a href="/">Go Home</a>`
      htmlOutput += goHome;
    res.send(htmlOutput) ;
 });

 app.get('/borrow-or-return', (req, res) => {
    console.log("Request received at the / endpoint")
    return res.sendFile(path.join(__dirname, "borrowreturn.html"))
 });

 app.post("/borrow", (req, res) => {
    for (let book of libraryBooks) {   
        if (book.title === req.body.bookName) 
        {
        if(book.isAvailable=== true && book.borrowedBy===""){
            book.isAvailable = false
            book.borrowedBy=req.body.libNum
            return res.send(`Sucess: Book Borrowed. <a href="/see-all">Click to see all Books</a>`)
            }else if (book.borrowedBy===req.body.libNum){
                return res.send(`ERROR You already have this book checked out`)
            }  else{
            return res.send ("ERROR You cannot borrow this book because it is borrowed by another user")
            } 
     } 
    }  
     return res.send(`ERROR: "${req.body.bookName}" book not found`)    
 })

 app.post("/return", (req, res) => {
  
    for (let book of libraryBooks){
        if (book.title === req.body.bookName) {
            book.isAvailable= true
            book.borrowedBy=""
            return res.send(`Sucess: Book returned. <a href="/see-all">Click to see all Books</a>`)
        }
    }



    return res.send("GPA has been updated!")
 })


app.listen(port, () => {
   console.log(`Server is running on port ${port}`)
});
