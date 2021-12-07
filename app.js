const bookmark_btn = document.querySelector('#bookmark_btn');
const bookmarkList = document.querySelector('.bookmarks');
document.addEventListener('DOMContentLoaded' , getBokmarks);

//Get bookmarks from local storage
function getBokmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if(!bookmarks){
        bookmarks = [];
    }

    bookmarks.forEach(bookmark => {
        const markup = `<div class="bookmark-card">
        <p>${bookmark.text} <span id="bookmark_id">${bookmark.id}</span></p>
        <p id="date">Added on:${bookmark.date}</p>
        <a href="${bookmark.url}" class="btn btn-primary" id="view_bookmark" target="_black">View</a>
        <a href="#" class="btn btn-danger" id="delete_bookmark" >Delete</a>
    </div>`

bookmarkList.insertAdjacentHTML('afterbegin' , markup);
    });

}

//Add new Bookmark
bookmark_btn.addEventListener('click' , addBookmark);

function addBookmark(){
    const text = document.querySelector('#textField').value;
    const url = document.querySelector('#urlField').value;
    const date = new Date(Date.now()).toString().substring(0,24);

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if(!bookmarks){
        bookmarks = [];
        id=0;
    }else{
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        id = parseInt(bookmarks[bookmarks.length -1].id) +1;
    }

    let bookmark = {
        "id" : 1,
        "text" : text,
        "url" : url,
        "date" : date
    };

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));

    const markup = `<div class="bookmark-card">
                    <p>${text} <span id="bookmark_id">${bookmark.id}</span></p>
                    <p id="date">Added on:${date}</p>
                    <a href="${url}" class="btn btn-primary" id="view_bookmark" target="_black">View</a>
                    <a href="#" class="btn btn-danger" id="delete_bookmark" >Delete</a>
                </div>`

    bookmarkList.insertAdjacentHTML('afterbegin' , markup);
}

document.querySelector('form').addEventListener('submit' , e => {
    e.preventDefault();
});


//Delete bookmark from the list

bookmarkList.addEventListener('click', e => {
    if(e.target.matches("#delete_bookmark")){
        let id = document.querySelector("#bookmark_id").textContent;
        e.target.parentElement.remove();

        removeBookmarkfromLocalStorage(id);
    }
});

//Remove bookmark from local storage

function removeBookmarkfromLocalStorage(id){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if(!bookmarks){
        bookmarks = [];
    }

    bookmarks.forEach((bookmark , index) => {
        if(bookmark.id = parseInt(id)){
            bookmarks.splice(index , 1);
        }
    });

    localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
}