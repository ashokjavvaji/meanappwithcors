function Book() {
    this._id = 0;
    this.title = "";
    this.author = "";
    this.isbn = "";
    this.publicationDate = new Date();
    this.publisher = "";
    this.price = 0;
    this.genre = "";
    this.format = "";
}

module.exports = Book;