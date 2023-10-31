import type { APIRoute } from "astro";
import { XataClient } from "../../xata";

export const POST: APIRoute = async ({ request }) => {
    // INPUT DATA
    const data = await request.formData();
    const data_username = data.get("username");
    const data_email = data.get("email");
    const data_password = data.get("password");

    // FETCH EMAIL REGISTERED
    const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });
    const record = await xata.db.User.filter({
        email: `${data_email}`
    }).getAll();

    let email_registered = "";

    for (let i = 0; i < record.length; i++) {
        email_registered = record[i].email;
    }    
    
    if (!data_email || !data_password) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields!",
            }),
            { status: 400 }
        );
    }

    if (data_email === email_registered) {
        return new Response(
            JSON.stringify({
            message: "Your account is already registered!",
            }),
            { status: 400 }
        );
    }
    
    else {
        const record = await xata.db.User.create({
            username: `${data_username}`,
            email: `${data_email}`,
            password: `${data_password}`
          });
        
        return new Response(
            JSON.stringify({
            message: "Your account has been created!"
            }),
            { status: 200 }
        );
    }
};
