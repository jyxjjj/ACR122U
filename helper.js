String.prototype.HextoDec = function () {
    str = this.toString().replace(' ', '');
    return parseInt(str, 16);
};
String.prototype.addspace = function () {
    hstr = this.toString();
    hstr = hstr.toUpperCase();
    let temp = '';
    for (let i = 0; i <= hstr.length; i = i + 2) {
        temp += hstr.substr(i, 2) + ' ';
    }
    return temp.trim();
};
Buffer.prototype.getData = function () {
    data = this.toString('hex');
    return data.substr(0, data.length - 4);
};
Buffer.prototype.getDataBuffer = function () {
    return this.slice(0, data.length - 2);
};
Buffer.prototype.getStatus = function () {
    data = this.toString('hex');
    return data.substr(-4, 4);
};
Buffer.prototype.getxor = function () {
    let r = null;
    Buffer.from(this).forEach(v => {
        if (r == null) {
            r = v;
        } else {
            r = r ^ v;
        }
    })
    return r.toString(16).toUpperCase();
};
