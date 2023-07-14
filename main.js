// Массив для сохраниния комментариев
let comments = ["sss"];

//Функция для отображения предыдущих комментариев
function displayPreviousComments() {
  // Контейнер для отображения предыдущих комментариев (div)
  let previousCommentsContainer = document.getElementById("previous-comments");

  // установка в переменную previousCommentsContainer пустой строки
  previousCommentsContainer.innerHTML = "";

  // Цикл проходит по каждому элементу массива coments и сохраняет каждый элемент в переменную comment
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
    console.log(comment);

    //  создается новый элемент div и сохраняется в переменную commentElement
    let commentElement = document.createElement("div");

    // создается класс для переменной commentElement
    commentElement.classList.add("comment");

    // в переменную commentElement присваивается текст из переменной comment
    commentElement.textContent = comment.text;

    // если условие возвращяет true то переменной commentElement добавится класс "comment-reply -комментарий-ответ"
    if (comment.isReply) {
      commentElement.classList.add("comment-reply");
    }

    //  создаетсясновый div и присваиваетя В переменную commentActions
    let commentActions = document.createElement("div");

    // создается новый класс comment-actions для div commentActions
    commentActions.classList.add("comment-actions");

    // Создается кнопка и присваивается в переменную deleteButton
    let deleteButton = document.createElement("button");   
    deleteButton.textContent = "Удалить";  // Текст для кнопки 
    deleteButton.addEventListener("click", function (event) {  // Слушатель для кнопки Удалить

      // В переменную commentIndex сохраняется индекс каждого элемента массива 
      let commentIndex = comments.indexOf(comment);
      // Если в массиве нет индекса возвращается -1
      if (commentIndex > -1) {
        // удаление элемента методом splice()
        comments.splice(commentIndex, 1); 
        // Обновление отображения 
        displayPreviousComments();
      }
    });

    let replyButton = document.createElement("button");
    replyButton.textContent = "Ответить";
    replyButton.addEventListener("click", function (event) {
      let replyComment = prompt("Введите ваш ответ на комментарий:");
      if (replyComment) {
        comments.push({ text: replyComment, isReply: true });
        displayPreviousComments();
      }
    });

    commentActions.appendChild(deleteButton);
    commentActions.appendChild(replyButton);

    commentElement.appendChild(commentActions);

    previousCommentsContainer.appendChild(commentElement);
  }
}

function addComment() {
  let commentInput = document.getElementById("comment-input");
  let commentText = commentInput.value.trim();

  if (commentText === "") {
    alert("Пожалуйста, введите комментарий.");
    return;
  }

  comments.push({ text: commentText, isReply: false });

  displayPreviousComments();

  commentInput.value = "";
}

let commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addComment();
});

displayPreviousComments();
