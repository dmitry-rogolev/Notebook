function token(count = 60, prefix = 'token_') {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = prefix;
    for (let i = 0; i < count; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

function escapeHtml(str) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return str.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function escapeRegex(str) {
	return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}


export { token, escapeHtml, escapeRegex };