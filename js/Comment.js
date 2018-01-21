class Comment
{
    constructor(countComments, arrComments){
        this.countComments = countComments;
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
        let commentsCount = $('#commentsCount');
        let commentsData = $('<div id="countCom" />', {});


        $.get({
            url: './json/comments.json',
            dataType: 'json',
            success: function (data) {

                this.countComments = data.comments.length;

                commentsData.append('<h4 id="countOut">Всего комментариев: ' + this.countComments + '</h4>');
                commentsData.appendTo(commentsCount);

                for (let index in data.comments) {
                    let commentDiv = $('<div class="comment" />', {});
                    commentDiv.append('<p>User ID: ' + data.comments[index].id_user + '</p>');
                    commentDiv.append('<p>' + data.comments[index].text + '</p>');
                    commentDiv.append('<p><button class="like">Одобрить отзыв</button>' +
                        '<button class="del">Удалить отзыв</button></p>');
                    this.arrComments.unshift(commentDiv);
                 }
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
        this.renderComments();
        this.refreshCountComments();
    }

    refreshCountComments(){
        let commentsCount = $('#commentsCount');
        let commentsData = $('#countCom');
        commentsData.empty();
        commentsData.append('<h4 id="countOut">Всего комментариев: ' + this.arrComments.length + '</h4>');
        commentsData.appendTo(commentsCount);
    }

    deleteComment(i){
        this.arrComments.splice(i, 1);
        this.refreshCountComments();
        this.renderComments();
    }
}