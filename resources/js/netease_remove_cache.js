// 移除缓存相关的请求头
let headers = $request.headers;
delete headers['If-Modified-Since'];
delete headers['If-None-Match'];

$done({headers});
