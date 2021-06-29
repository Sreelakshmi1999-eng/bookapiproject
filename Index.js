
const express = require("express");
//Database
 const database = require("./database");

//initialization
const booky = express();

/*
Route          Root(/)
Description    Get all books
Access         Public
Parameter      None
Methods        Get
 */

booky.get("/",(req,res)=>{
  return res.json({books: database.books});
});


/*
Route          /I
Description    Get specific books
Access         Public
Parameter      ISBN
Methods        Get
 */


booky.get("/I/:isbn", (req,res)=>{
    const getSpecificBooks = database.books.filter((book) => book.ISBN === req.params.isbn);

if (getSpecificBooks.length === 0) {
    return res.json({
        error: `NO book found for the ISBN of ${req.params.isbn}`,
    });
}

    return res.json({book:getSpecificBooks});

});

/*
Route          /c
Description    Get specific books based on category
Access         Public
Parameter      category
Methods        Get
 */


booky.get("/C/:category", (req,res)=>{
    const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category)  );

if (getSpecificBooks.length === 0) {
    return res.json({
        error: `NO book found for the category of ${req.params.category}`,
    });
}

    return res.json({book:getSpecificBooks});

});


/*
Route          /L
Description    Get specific books
Access         Public
Parameter      language
Methods        Get
 */


booky.get("/L/:language", (req,res)=>{
    const getSpecificBooks = database.books.filter((book) => book.language === req.params.language);

if (getSpecificBooks.length === 0) {
    return res.json({
        error: `NO book found for the language of ${req.params.language}`,
    });
}

    return res.json({book:getSpecificBooks});

});


/*
Route          /A
Description    Get all authors
Access         Public
Parameter      None
Methods        Get
 */

booky.get("/A",(req,res)=>{
    return res.json({authors: database.author});
  });

/*
Route          /A
Description    Get specific authors
Access         Public
Parameter      id
Methods        Get
 */

booky.get("/A/:id", (req,res)=>{
    const getSpecificAuthor = database.author.filter((author) => author.id === req.params.id);

if (getSpecificAuthor.length === 0) {
    return res.json({
        error: `NO book found for the author of ${req.params.id}`,
    });
}

    return res.json({author:getSpecificAuthor});

});



booky.listen(3000, () => console.log("Server is Running!!😍😍"));
