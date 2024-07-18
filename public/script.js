function likePost(button) {
    button.innerHTML = '<i class="fas fa-thumbs-up"></i> Liked';
    button.classList.add('liked');
}

function retweetPost(button) {
    button.innerHTML = '<i class="fas fa-recycle"></i> Retweeted';
    button.classList.add('retweeted');
}

function replyPost(button) {
    const tweet = button.closest('.tweet');
    const replySection = tweet.querySelector('.reply-section');
    replySection.style.display = replySection.style.display === 'none' ? 'block' : 'none';
}

function postReply(button) {
    const replySection = button.closest('.reply-section');
    const textarea = replySection.querySelector('textarea');
    if (textarea.value.trim() !== '') {
        alert('Reply posted: ' + textarea.value);
        textarea.value = '';
        replySection.style.display = 'none';
    } else {
        alert('Reply cannot be empty');
    }
}


// Get elements
const postBtn = document.getElementsByClassName('postBtn')[0];  // I had to had the index of 0 because the buttons were getting the live elements of the page 
const formSub = document.getElementsByClassName('write-post')[0];  
const postVals = document.getElementById('postVals');  
const list = document.getElementById('list');  

// creating a new twitter post
const createPost = (event) => {
    event.preventDefault(); 
    // creating/add a new list item in the unordered list "list" and aadding an li with the same formatting as previous 
    let newPost = list.innerHTML += `
        <li>
            <div class="tweet">
                <div class="tweet-header">
                    <img src="employee_image_mikno49.jpeg" alt="ProfilePic1" width="50" height="50">
                    <div>
                        <span class="username">John Doe</span>
                        <span class="handle">@johndoe</span>
                    </div>
                </div>
                <span class="tweet-content">
                    ${postVals.value}
                </span>
                <div class="tweet-footer">
                    <button class="button like-button" onclick="likePost(this)">Like</button>
                    <button class="button retweet-button" onclick="retweetPost(this)">Retweet</button>
                    <button class="button reply-button" onclick="replyPost(this)">Reply</button>
                </div>
                <div class="reply-section" style="display: none;">
                    <form class="reply-form">
                        <textarea name="replyContent" placeholder="Write a reply..."></textarea>
                        <button type="submit" class="button">Post Reply</button>
                    </form>
                </div>
            </div>
        </li>`;
    postVals.value = '';   // clearing  the textarea
    
    newPost.forEach(() => {
        localStorage.setItem("newPost", newPost)
    })

};
console.log(list.innerHTML)
postBtn.addEventListener('click', createPost);


const getAllPosts = (newPost) => {
    localStorage.getItem(newPost)
}

const updatePost = () => {

}

const deletePost = () => {

}

