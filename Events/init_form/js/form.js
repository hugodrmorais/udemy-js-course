(function () {
    'use strict';

    const txtTitle = document.getElementById("txtTitulo"); // Changed to txtTitle
    const btn = document.getElementById("btn");
    const registrationForm = document.querySelector(".formCadastro"); // Changed to registrationForm

    registrationForm.addEventListener("submit", function (e) {
        console.log(txtTitle.value);
        if (!txtTitle.value) {
            showErrorMessage("Please fill in all fields", function () { // Translated message
                txtTitle.focus();
            });
            e.preventDefault();
        }
    });

    const feedbackMessage = document.getElementById("feedbackMessage");
    const feedbackMessageCloseBtn = feedbackMessage.getElementsByTagName("button")[0];

    function showErrorMessage(msg, cb) {
        feedbackMessage.classList.add("show");
        feedbackMessage.getElementsByTagName("p")[0].textContent = msg;

        feedbackMessageCloseBtn.focus();

        function hideErrorMessage() {
            console.log("close clicked"); // Translated message
            feedbackMessage.classList.remove("show");

            feedbackMessageCloseBtn.removeEventListener("click", hideErrorMessage);
            feedbackMessageCloseBtn.removeEventListener("keyup", pressedKeyboardOnBtn);

            if (typeof cb === "function") {
                cb();
            }
        }

        function pressedKeyboardOnBtn(e) {
            if (e.keyCode === 27) { // 27 is the keycode for 'Escape'
                hideErrorMessage();
            }
        }

        feedbackMessageCloseBtn.addEventListener("click", hideErrorMessage);
        feedbackMessageCloseBtn.addEventListener("keyup", pressedKeyboardOnBtn);
    }

    const txtDescription = document.getElementById("txtDescricao"); // Changed to txtDescription
    const counterContainer = document.getElementById("contador"); // Changed to counterContainer
    const remainingChars = counterContainer.getElementsByTagName("span")[0]; // Changed to remainingChars
    const maxLength = txtDescription.maxLength;

    displayNumber(maxLength); // Changed to displayNumber

    counterContainer.style.display = "block";

    function checkLength() {
        let typedCharacters = this.value.length; // Changed variable name
        let charactersLeft = parseInt(maxLength) - parseInt(typedCharacters); // Changed variable name
        displayNumber(charactersLeft); // Changed to displayNumber
    }

    function displayNumber(n) { // Changed function name
        remainingChars.textContent = n;
    }
    txtDescription.addEventListener("input", checkLength);

    btn.disabled = true;

    const chkAccepted = document.getElementById("chkAceito"); // Changed to chkAccepted
    chkAccepted.addEventListener("change", function () {
        btn.disabled = !this.checked;
    });
})();
