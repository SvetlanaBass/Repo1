class Comment
{
    constructor(arrComments){
        this.arrComments = arrComments;
    }

    renderComments(){
        let comments = $('#comments');
        comments.empty();
        for (let i = 0; i < this.arrComments.length; i++){
            this.arrComments[i].appendTo(comments);
        }
    }

    showCommentsItems(){
        $.get({
            url: './json/comments.json',
            dataType: 'json',
            success: function (data) {

                for (let index in data.comments) {
                    let commentDiv = $('<div class="comment" />', {});
                    commentDiv.append('<p>User ID: ' + data.comments[index].id_user + '</p>');
                    commentDiv.append('<p>' + data.comments[index].text + '</p>');
                    commentDiv.append('<p><button class="like">Одобрить отзыв</button>' +
                        '<button class="del">Удалить отзыв</button></p>');
                    this.arrComments.unshift(commentDiv);
                 }
                this.refreshCountComments();
                this.renderComments();
            },
            context: this
        });
    }

    addComment(userID, text){
        let commentDiv = $('<div class="comment" />', {});
        commentDiv.append('<p>User ID: ' + userID + '</p>');
        commentDiv.append('<p>' + text + '</p>');
        commentDiv.append('<p><button class="like">Одобрить отзыв</button>' +
            '<button class="del">Удалить отзыв</button></p>');
        this.arrComments.unshift(commentDiv);
        this.refreshCountComments();
        this.renderComments();

    }

    refreshCountComments(){
        let commentsData= $('.countOut');
        commentsData.empty();
        commentsData.append(this.arrComments.length);
    }

    deleteComment(i){
        this.arrComments.splice(i, 1);
        this.refreshCountComments();
        this.renderComments();
    }
}