document.addEventListener('DOMContentLoaded', () => {
    const doors = document.querySelectorAll('.door');
    let completedQuestions = 0;
    const totalQuestions = document.querySelectorAll('.card').length;
    let score = 0;

    doors.forEach(door => {
        door.addEventListener('click', () => {
            const card = door.closest('.card');
            const feedbackPanel = card.querySelector('.feedback-panel');
            const alertBox = feedbackPanel.querySelector('.alert');
            const tryAgainButton = feedbackPanel.querySelector('.try-again');

            if (feedbackPanel.classList.contains('show')) return;

            const isCorrect = door.getAttribute('data-answer') === 'true';
            const explanation = door.getAttribute('data-explanation');

            if (isCorrect) {
                alertBox.classList.add('correct');
                alertBox.classList.remove('incorrect');
                tryAgainButton.style.display = "none";
                alertBox.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Correct! ' + explanation;
                score++;
            } else {
                alertBox.classList.add('incorrect');
                alertBox.classList.remove('correct');
                alertBox.innerHTML = '<i class="bi bi-x-circle-fill me-2"></i>Incorrect. ' + explanation;
            }

            const bsCollapse = new bootstrap.Collapse(feedbackPanel, {
                toggle: true
            });

            const allDoors = card.querySelectorAll('.door');
            allDoors.forEach(d => d.classList.add('disabled'));

            completedQuestions++;

            if (completedQuestions === totalQuestions) {
                const scoreDisplay = document.getElementById('score-display');
                scoreDisplay.textContent = `You scored ${score} out of ${totalQuestions}.`;

                document.getElementById('completion-message').style.display = 'block';
                document.getElementById('completion-message').scrollIntoView({ behavior: 'smooth' });
            }

            tryAgainButton.addEventListener('click', () => {
                const bsCollapseTryAgain = new bootstrap.Collapse(feedbackPanel, {
                    toggle: false
                });
                feedbackPanel.classList.remove('show');

                alertBox.classList.remove('correct', 'incorrect');
                alertBox.innerHTML = '';

                allDoors.forEach(d => {
                    d.classList.remove('disabled');
                    d.removeAttribute('disabled');
                });

                completedQuestions--;
                if (isCorrect) {
                    score--;
                }

                if (completedQuestions < totalQuestions) {
                    document.getElementById('completion-message').style.display = 'none';
                }
            }, { once: true });
        });
    });

    const retakeQuizButton = document.getElementById('retake-quiz');
    retakeQuizButton.addEventListener('click', () => {
        completedQuestions = 0;
        score = 0;

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            const feedbackPanel = card.querySelector('.feedback-panel');
            const bsCollapse = new bootstrap.Collapse(feedbackPanel, {
                toggle: false
            });
            feedbackPanel.classList.remove('show');

            const alertBox = feedbackPanel.querySelector('.alert');
            alertBox.classList.remove('correct', 'incorrect');
            alertBox.innerHTML = '';

            const allDoors = card.querySelectorAll('.door');
            allDoors.forEach(d => {
                d.classList.remove('disabled');
                d.removeAttribute('disabled');
                d.setAttribute('aria-pressed', 'false');
            });
        });

        document.getElementById('completion-message').style.display = 'none';
    });
});
