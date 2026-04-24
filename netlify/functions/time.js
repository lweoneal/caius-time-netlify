exports.handler = async function(event, context) {
  const now = new Date();
  const options = {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  const timeString = now.toLocaleString('en-US', options);

  // Write time to GitHub
  try {
    const owner = 'lweoneal';
    const repo = 'caius-time-netlify';
    const path = 'current-time.txt';
    const token = process.env.GITHUB_TOKEN;

    // Get current file SHA
    const getRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      { headers: { 'Authorization': `token ${token}`, 'User-Agent': 'caius-time' } }
    );

    let sha = undefined;
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    // Write new time
    await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'User-Agent': 'caius-time',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update current time',
          content: btoa(timeString),
          sha: sha
        })
      }
    );
  } catch(e) {}

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store'
    },
    body: timeString
  };
};
