import type { APIRoute } from "astro";
import { XataClient } from "../../xata";

export const POST: APIRoute = async ({ request }) => {
  // INPUT DATA
  const data = await request.formData();
  const data_email = data.get("email");
  const data_password = data.get("password");

  // FETCH EMAIL & PASSWORD REGISTERED
  const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });
  const record = await xata.db.User.filter({
    email: `${data_email}`,
    password: `${data_password}`,
  }).getAll();

  let email_registered = "";
  let password_registered = "";

  for (let i = 0; i < record.length; i++) {
    email_registered = record[i].email;
    password_registered = record[i].password;
  }

  if (!data_email || !data_password) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields!",
      }),
      { status: 400 }
    );
  }

  if (data_password !== password_registered) {
    return new Response(
      JSON.stringify({
        message: "Your email or password is inccorect!",
      }),
      { status: 400 }
    );
  }

  if (
    data_email === email_registered &&
    data_password === password_registered
  ) {
    // Create a cookie session
    const session = {
      id: record[0].id,
      username: record[0].username,
      email: record[0].email,
    };

    // Set the cookie session in the response
    const response = new Response(
      JSON.stringify({
        message: "Login succeed!",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `session=${JSON.stringify(
            session
          )}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      }
    );

    return response;
  }
};
