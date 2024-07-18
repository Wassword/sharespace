    document.addEventListener('DOMContentLoaded', () => {
        const postButton = document.getElementById('postButton');
        const postContent = document.getElementById('postContent');
        const postList = document.getElementById('postList');
        const errorMessage = document.getElementById('errorMessage');
    
        // Load posts from local storage
        const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postList.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('tweet');
            postDiv.innerHTML = `
            <div class="tweet-header">
                <img src="default-profile-pic.jpg" alt="ProfilePic" width="50" height="50">
                <div>
                <span class="username">User</span>
                <span class="handle">@username</span>
                </div>
            </div>
            <div class="tweet-content">
                <p>${post}</p>
            </div>
            <div class="tweet-footer">
                <button class="button">Like</button>
                <button class="button">Retweet</button>
                <button class="button">Reply</button>
            </div>
            `;
            postList.appendChild(postDiv);
        });
        };
    
        // Save post to local storage
        const savePost = (post) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
        };
    
        // Display error message
        const displayError = (message) => {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
        };
    
        // Event listener for post button
        postButton.addEventListener('click', () => {
        const post = postContent.value.trim();
        if (post === '') {
            displayError('Post content cannot be empty.');
        } else if (post.length > 280) {
            displayError('Post content cannot exceed 280 characters.');
        } else {
            savePost(post);
            postContent.value = '';
        }
        });
    
        // Initial load of posts
        loadPosts();
    });
    