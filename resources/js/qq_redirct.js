let url = $request.url;
let match = url.match(/[?&]pfurl=([^&]+)/);

if (match) {
  let realUrl = decodeURIComponent(match[1]);
  $done({
    status: 302,
    headers: {
      Location: realUrl
    }
  });
} else {
  $done({});
}