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
