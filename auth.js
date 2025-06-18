export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("No code provided");
  }

  const data = new URLSearchParams({
    client_id: "1384931439770079232",
    client_secret: "CCDpOcYRmC8tepz3bbC-pw9f09kYeQb1",
    grant_type: "authorization_code",
    code,
    redirect_uri: "https://main-22ys02dnu-pfpa.vercel.app/api/auth",
    scope: "identify",
  });

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const json = await response.json();
  const userResponse = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `${json.token_type} ${json.access_token}`,
    },
  });

  const user = await userResponse.json();

  res.redirect(`/welcome.html?username=${user.username}&avatar=${user.avatar}&id=${user.id}`);
}
