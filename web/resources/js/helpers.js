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

function cutForbiddenTags(str) {
    return str.replace(/<\/?[^>]+>/igm, (v) => { 
        return /<\/?(script|meta|body|iframe|head|html).*>/igm.test(v) ? '' : v;
    });
}

function getTextNodes(element) {
    let textNodes = [];

    element.childNodes.forEach((v) => {
        if (v.nodeType == 3) {
            textNodes.push(v);
        } else {
            textNodes = textNodes.concat(this.getTextNodes(v));
        }
    });

    return textNodes;
}

export { token, escapeHtml, escapeRegex, cutForbiddenTags, getTextNodes };