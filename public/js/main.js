$(document).ready(() => {
  // Add another answer input to the add question form.
  $('.btn-add-answer').on('click', (e) => {
    e.preventDefault();

    $('.answer-inputs').append('<div class="form-group"><input type="text" name="answers" class="form-control" placeholder="Enter an answer"></div>');
  });
});
