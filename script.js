// Dynamic Elements
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteURLEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmark-container');

let bookmarks = [];

// Show Modal, focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click',(e) => (e.target === modal ? modal.classList.remove('show-modal') : false)); // This dismisses a modal if clicking on the overlay

//Validate Form
function validateURL(nameValue,urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    if(!urlValue.match(regex)) {
        alert('Please provide a valid url');
        return false;
    }
    //Valid
    return true;
}

// Populates DOM with bookmarks in local storage
function buildBookmarks() {
    bookmarks.forEach((bookmark) => {
       const { name, url } = bookmark;

        // Item Div
        const item = document.createElement('div');
        item.classList.add('item');
        // Close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas','fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
        // Favicon/link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt','Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank');
        link.textContent = name;

        // Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.append(item);
    });
}

// Fetch bookmarks from local storage
function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        // Create bookmarks array
        bookmarks = [
            {
                name: 'Quote Generator',
                url: 'https://youmorcant.github.io/quoteGenerator/',

            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// Store Bookmark
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteURLEl.value;
    
    //Validation of form data
    if (!urlValue.includes('http://','https://')){
        urlValue = `https://${urlValue}`;
    }
    if (!validateURL(nameValue,urlValue)){
        return false;
    }

    // Creates new bookmark object
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    // add bookmark to bookmarks array
    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load
fetchBookmarks();