export default async function handler(req, res) {
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/discord_token=([^;]+)/);

  if (!match) {
    return res.status(401).json({ loggedIn: false });
  }

  const token = match[1];

  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!userRes.ok) {
    return res.status(401).json({ loggedIn: false });
  }

  const user = await userRes.json();

  res.json({
    id: user.id,
    username: user.username,
    avatar: user.avatar
  });
}
