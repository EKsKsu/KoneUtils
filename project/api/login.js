export default function handler(req, res) {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.REDIRECT_URI,
    scope: 'identify'
  });

  res.redirect(
    `https://discord.com/oauth2/authorize?${params.toString()}`
  );
}
