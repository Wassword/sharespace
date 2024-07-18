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


//getting the eleements
const postBtn = document.getElementsByClassName('postBtn')[0];  // I had to had the index of 0 because the buttons were getting the live elements of the page 
const formSub = document.getElementsByClassName('write-post')[0];  
const postVals = document.getElementById('postVals');  
const list = document.getElementById('list');  


let newPosts = JSON.parse(localStorage.getItem("newPosts")) || [];//makes sure that each item has a key of newPost is always an array 
// // function for creating a new post
const createPost = (event) => {
    event.preventDefault();

    const content = postVals.value.trim();
    if (content === '') {
        alert('Error: Content cannot be empty.');
        return;
    }

    if (content.length > 255) {
        alert('Error: Content exceeds the 255 character limit.');
        return;
    }


    // i had to set is as an object to be able to iterate through the posts
    const newPost = {
        content: postVals.value,
        username: 'Ave Ventura',
        handle: '@Aceventura',
        profilePic: 'ace.jpg'
    };
    newPosts.push(newPost)//pushing the post to the array 
    localStorage.setItem("newPosts", JSON.stringify(newPosts));//setting the new posts in local storage
    getAllPosts(); //calling the render functoin for each newPost created

    postVals.value = '';
};

const getAllPosts = () => {
    list.innerHTML = '';
    //iiterating through the newPost array foreach post in local storage
    newPosts.forEach((post, index) => {
        list.innerHTML += `
            <li id="post-${index}">
                <div class="tweet">
                    <div class="tweet-header">
                        <img src="${post.profilePic}" alt="ProfilePic1" width="50" height="50">
                        <div>
                            <span class="username">${post.username}</span>
                            <span class="handle">${post.handle}</span>
                            
                        </div>
                        <div id="buttonBox">
                            <button class="button edit-button" onclick="editPost(${index})"></button>
                            <button class="button delete-button" onclick="deletePost(${index})"></button>
                        </div>
                    </div>
                    <br>
                    
                    <span class="tweet-content" id="content-${index}">
                        ${post.content}
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
    });
};

//edit post base on the index of content in newpost and returning an html elemnt for text area and a sumbit button
const editPost = (index) => {
    const contentElement = document.getElementById(`content-${index}`);
        const post = newPosts[index];
        contentElement.innerHTML = `
            <textarea id="editContent-${index}">${post.content}</textarea>
            <button class="button save-button" onclick="savePost(${index})">Save</button>
        `;
};

const savePost = (index) => {
    const editedContent = document.getElementById(`editContent-${index}`).value.trim();
    if (editedContent === '') {
        alert('Error: Content cannot be empty.')
        return;
    }
    if (editedContent.length > 255) {
        alert('Error: Content exceeds the 255 character limit.')
        return;
    }
    newPosts[index].content = editedContent;
    localStorage.setItem("newPosts", JSON.stringify(newPosts));
    getAllPosts();
};

//deleting the post by the index of the newPost
const deletePost = (index) => {
        newPosts.splice(index, 1);
        localStorage.setItem("newPosts", JSON.stringify(newPosts));
        getAllPosts();
    
}

// searching posts using filter
const searchPosts = () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredPosts = newPosts.filter(post => 
        post.content.toLowerCase().includes(searchInput) || 
        post.username.toLowerCase().includes(searchInput) || 
        post.handle.toLowerCase().includes(searchInput)
    );
    displayFilteredPosts(filteredPosts);
};

// once the search has completed return the elements that match the content and insert them back into html
const displayFilteredPosts = (posts) => {
    list.innerHTML = '';
    posts.forEach((post, index) => {
        list.innerHTML += `
            <li id="post-${index}">
                <div class="tweet">
                    <div class="tweet-header">
                        <img src="${post.profilePic}" alt="ProfilePic1" width="50" height="50">
                        
                        <div>
                            
                            <span class="username">${post.username}</span>
                            <span class="handle">${post.handle}</span>
                        </div>
                        <div id="buttonBox">
                            <button class="button edit-button" onclick="editPost(${index})"></button>
                            <button class="button delete-button" onclick="deletePost(${index})"></button>
                        </div>
                    </div>
                    
                    <br>
                    <span class="tweet-content" id="content-${index}">
                        ${post.content}
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
    });
};


postBtn.addEventListener('click', createPost);
document.addEventListener("DOMContentLoaded",getAllPosts)
// document.addEventListener('DOMContentLoaded', () => {
//     getAllPosts();
// });