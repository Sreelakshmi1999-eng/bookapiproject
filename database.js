const books = [{
    ISBN: "12345Books",
    title: "GEtting Starting with MERN",
    pubDAte: "02/04/2021",
    language: "en",
    numPage: "250",
    author: [1,2],
    publications:[1],
    category: ["tech","programming","Education","triller"],
},];

const author = [{
    id: 1,
    name:"Pavan",
    books:["12345Books","1234564"],
},
{
    id: 2,
    name:"Elon Musk",
    books:["12345Books"],

},];

const publications = [{
    id: 1,
    name:"sars",
    books:["12345Books"],
},];

module.exports = {books, author, publications};