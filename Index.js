const { response } = require("express");
const express = require("express");
//Database
 const database = require("./database");

//initialization
const booky = express();

 //configuration
 booky.use(express.json());

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


/*
Route          /author/book
Description    Get list of authors based on books 
Access         Public
Parameter      isbn
Methods        Get
 */


booky.get("/author/book/:isbn", (req,res)=>{
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn)  );

if (getSpecificAuthor.length === 0) {
    return res.json({
        error: `NO book found for the books of ${req.params.isbn}`,
    });
}

    return res.json({author:getSpecificAuthor});

});


/*
Route          /P
Description    Get all publications
Access         Public
Parameter      None
Methods        Get
 */

booky.get("/P",(req,res)=>{
    return res.json({Publications: database.publications});
  });


 /*
Route          /publications
Description    Get all publications
Access         Public
Parameter      name
Methods        Get
 */ 

booky.get("/P/:id", (req,res)=>{
    const getSpecificPubli = database.publications.filter((publication) => publication.id === req.params.id);

if (getSpecificPubli.length === 0) {
    return res.json({
        error: `NO book found for the Publication of ${req.params.id}`,
    });
}

    return res.json({publication:getSpecificPubli});

});


/*
Route          /P/publi
Description    Get list of publications based on books 
Access         Public
Parameter      isbn
Methods        Get
 */


booky.get("/P/publi/:isbn", (req,res)=>{
    const getSpecificPubli = database.publications.filter((publication) => publication.books.includes(req.params.isbn)  );

if (getSpecificPubli.length === 0) {
    return res.json({
        error: `NO book found for the publications of ${req.params.isbn}`,
    });
}

    return res.json({publication:getSpecificPubli});

});

/*
Route          /book/add
Description    add new book 
Access         Public
Parameter      none
Methods        post
 */
booky.post("/book/add", (req,res)=>{
    console.log(req.body);
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books:database.books});
});

/*
Route          /author/add
Description    add new author
Access         Public
Parameter      none
Methods        post
 */
booky.post("/author/add", (req,res) => {
    const {newAuthor} = req.body;
    database.author.push(newAuthor);
    return res.json({authors: database.author});
});


/*
Route          /publi/add
Description    add new publication
Access         Public
Parameter      none
Methods        post
 */
booky.post("/publi/add", (req,res) => {
    const {newPublication} = req.body;
    database.publications.push(newPublication);
    return res.json({publication: database.publications});
});

/*
Route          /book/update/title
Description    Update book title
Access         Public
Parameter      isbn
Methods        put
 */
booky.put("/book/update/title/:isbn", (req ,res) => {
    database.books.forEach((book)=> {
        if(book.ISBN === req.params.isbn)
        book.title = req.body.newBookTitle;
        return;
    });
 return res.json({books:database.books})
   
});

/*
Route          /book/update/author
Description    Update or add new authors
Access         Public
Parameter      isbn,authorId
Methods        put
 */

booky.put("/book/update/author/:isbn/:authorId", (req,res) => {
    //Update book database
    //Update author database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
            } 
    });
    database.author.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId) ){
            return author.books.push(req.params.isbn);
        }
    });
  return res.json({books:database.books, author: database.author})
});


/*
Route          /author/update/name
Description    Update author name
Access         Public
Parameter      id
Methods        put
 */
booky.put("/author/update/name/:id", (req ,res) => {
    database.author.forEach((author)=> {
        if(author.id === req.params.id)
        author.name = req.body.newAuthorName;
        return;
    });
 return res.json({author:database.author})
   
});




/*
Route          /publication/update/name
Description    Update publication name
Access         Public
Parameter      id
Methods        put
 */
booky.put("/publication/update/name/:id", (req ,res) => {
    database.publications.forEach((publication)=> {
        if(publication.id === req.params.id)
        publication.name = req.body.newPublicationName;
        return;
    });
 return res.json({publications:database.publications})
   
});




booky.listen(3000, () => console.log("Server is Running!!😍😍"));
