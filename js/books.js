function searchBooks() {
    var title, author, subject, isbn;
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    subject = document.getElementById("subject").value;
    isbn = document.getElementById("isbn").value;

    console.log("Title: " + title +"\nAuthor: " + author + "\nSubject: " + subject + "\nISBN: " + isbn);
    console.log(buildSearchUrl(title, author, subject, isbn));

    $.get(buildSearchUrl(title, author, subject, isbn), function(data, status) {
        console.log(data);
        $("#results").html("");
        if (data.totalItems > 0) {
            $("#results").addClass("populated-results");
            for (var i = 0; i < data.items.length; i++) {
                var r = data.items[i];
                $("#results").append(buildResult(r.volumeInfo.title, r.volumeInfo.authors, r.volumeInfo.description))
            }
        } else {
            $("#results").append('<span>No results found. Please try a different search.</span>');
        }
    });
}

function searchRandomBooks() {
    var subject = document.getElementById("genre").value;
    $.get("https://www.googleapis.com/books/v1/volumes?q=insubject:"+subject, function(data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
        $("#results").html("");
        $("#results").addClass("populated-results");
        for (var i = 0; i < data.items.length; i++) {
            var r = data.items[i];
            console.log(r);
            $("#results").append(buildResult(r.volumeInfo.title, r.volumeInfo.authors, r.volumeInfo.description, r.volumeInfo.previewLink))
        }
    });
}

function buildSearchUrl(title, author, subject, isbn) {
    var base = "https://www.googleapis.com/books/v1/volumes?q=";
    var appendTitle = (title == null || title == "") ? "" : "+intitle:"+encodeURIComponent(title);
    var appendAuthor = (author == null || author == "") ? "" : "+inauthor:"+encodeURIComponent(author);
    var appendSubject = (subject == null || subject == "") ? "" : "+insubject:"+encodeURIComponent(subject);
    var appendIsbn = (isbn == null || isbn == "") ? "" : "+isbn:"+encodeURIComponent(isbn);
    return base + appendTitle + appendAuthor + appendSubject + appendIsbn;
}

function buildResult(title, authors, description, previewUrl) {
    if (title && authors && description)
        return '<div class="bordered-element"><h3>' + title + '</h3><h4>' + authors + '</h4><span>' + description + '</span><br/><a target="_blank" href="' + previewUrl + '">Preview book</a></div>';
}
