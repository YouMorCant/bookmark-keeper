// Dynamic Elements
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteURLEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

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

// Store Bookmark
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteURLEl.value;
    console.log(nameValue,urlValue);
    if (!urlValue.includes('http://','https://')){
        urlValue = `https://${urlValue}`;
    }
    if (!validateURL(nameValue,urlValue)){
        return false;
    }
}

// Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark);