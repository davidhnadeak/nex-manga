let registerPage_responseMessage = "";

const registerPage_form = document.querySelector(".form");

registerPage_form.addEventListener("submit", async function submit(e) {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);

  const response = await fetch("/api/register", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.message) {
    registerPage_responseMessage = data.message;
  }

  document.getElementById("response-message").innerHTML =
    registerPage_responseMessage;
});
