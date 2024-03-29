require('./helper');
log = function (obj, force = false) {
    if (force) {
        console.log(obj);
    } else {
        // console.debug(obj);
    }
};

sleep = function (time) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, time);
};

meaning = function (statusCode) {
    let statusCodes = {
        '^9000$': '成功',
        '^61(.{2})$': '成功, （SW2表示仍然可用的响应字节数）',
        '^62(.{2})$': '警告',
        '^6200$': '没有信息',
        '^6281$': '部分返回数据可能已损坏',
        '^6282$': '读取le字节前到达文件/记录结尾',
        '^6283$': 'ret数据可能包含结构信息',
        '^6284$': '所选文件无效',
        '^6285$': '文件控制信息不是必需的格式',
        '^6286$': '写入失败',
        '^63(.{2})$': '警告',
        '^6300$': '没有信息',
        '^6381$': '上次写满文件',
        '^6382$': '重试后执行成功',
        //          c0	least significant nibble is a counter....
        //          ..	..valued from 0 to 15
        //          cf
        '^64(.{2})$': '执行错误',
        '^65(.{2})$': '执行错误',
        '^6500$': '没有信息',
        '^6581$': '内存错误',
        '^66(.{2})$': '保留',
        '^6700$': '长度错误',
        '^68(.{2})$': '检查错误： 不支持CLA中的函数（请参阅SW2）',
        '^6800$': '没有信息',
        '^6881$': '不支持的逻辑通道',
        '^6882$': '不支持安全消息传递',
        '^69(.{2})$': '检查错误： 命令不被允许（请参阅SW2）',
        '^6a(.{2})$': '检查错误： 参数错误 （p1或p2）  （请参阅SW2）',
        '^6b(.{2})$': '检查错误： 参数错误',
        '^6c(.{2})$': '检查错误： 长度错误 （SW2表示le的正确长度）',
        '^6d(.{2})$': '检查错误： ins错误',
        '^6e(.{2})$': '检查错误： 不支持的类',
        '^6f(.{2})$': '检查错误： 没有精确的诊断'
    };
    for (let prop in statusCodes) {
        if (statusCodes.hasOwnProperty(prop)) {
            let result = statusCodes[prop];
            if (statusCode.match(prop)) {
                return result;
            }
        }
    }
    return '未知错误';
};
