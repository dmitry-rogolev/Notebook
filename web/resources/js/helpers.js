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
    
    return str.replace(/[&<>"']/gm, function(m) { return map[m]; });
}

function escapeRegex(str) {
	return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/gm, "\\$1");
}

function cutTags(str) {
	return str.replace(/<\/?[^>]+>/igm, (v) => { 
        return /<\/?(ul|ol|li|p|div|br|span|h|b|i|sub|sup|strong|em|img|table|tr|td|th).*>/igm.test(v) ? v : '';
    });
}


export { token, escapeHtml, escapeRegex, cutTags };