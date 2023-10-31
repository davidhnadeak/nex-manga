let loginPage_responseMessage = "";

const loginPage_form = document.querySelector(".form");

loginPage_form.addEventListener("submit", async function submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    if (data.message) {
        loginPage_responseMessage = data.message;
    }

    document.getElementById("response-message").innerHTML = loginPage_responseMessage;

    function redirectTo(url) {
        window.location.href = url;
    }

    if (loginPage_responseMessage == "Login succeed!") {
        redirectTo("/");
    }
});
