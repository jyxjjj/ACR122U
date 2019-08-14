/**
 * @return {number}
 */
String.prototype.HextoDec = function () {
    let str = this.replace(' ', '');
    return parseInt(str, 16);
};
String.prototype.addspace = function () {
    let hstr = this.toUpperCase();
    let temp = '';
    for (let i = 0; i <= hstr.length; i = i + 2) {
        temp += hstr.substr(i, 2) + ' ';
    }
    return temp.trim();
};
/**
 * @return {number}
 */
Buffer.prototype.HextoDec = function () {
    let data = this.toString('hex');
    return data.HextoDec();
};
Buffer.prototype.addspace = function () {
    let data = this.toString('hex');
    return data.addspace();
};
Buffer.prototype.getData = function () {
    let data = this.toString('hex');
    return data.substr(0, data.length - 4);
};
Buffer.prototype.getDataBuffer = function () {
    return this.slice(0, this.length - 2);
};
Buffer.prototype.getLeft = function () {
    return this.slice(0, 8);
};
Buffer.prototype.getRight = function () {
    return this.slice(8, 16);
};
Buffer.prototype.getStatus = function () {
    let data = this.toString('hex');
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
    });
    return r.toString(16).toUpperCase();
};
