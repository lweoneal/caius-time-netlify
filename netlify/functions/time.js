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
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    },
    body: timeString
  };
};
