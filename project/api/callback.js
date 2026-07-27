export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing code');
  }

  const body = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.REDIRECT_URI
  });

  const tokenRes = await fetch(
    'https://discord.com/api/oauth2/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }
  );

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return res.status(400).json(tokenData);
  }

  res.setHeader(
    'Set-Cookie',
    `discord_token=${tokenData.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`
  );

  res.redirect('/');
}
