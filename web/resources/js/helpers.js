function token(count = 60, prefix = 'token_') {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = prefix;
    for (let i = 0; i < count; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

export { token, escapeHtml };