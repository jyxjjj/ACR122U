require('./common');
require('./helper');
require('./handle');

getCard = function (card) {
    global.card = card;
    card.issueCommand([0xFF, 0xCA, 0x00, 0x00, 0x04], (err, res) => {
        if (res.getStatus().addspace() == '90 00') {
            log(`卡号：${res.getData().addspace()}`);
            log(`十进制卡号：${res.getData().HextoDec()}`);
        } else {
            log(`读取卡号失败[${res.getStatus()}]：${meaning(res.getStatus())}`);
        }
    });
};

loadKey = function (card, location = 0x00, pass = null) {
    let cmd = null;
    if (pass != null && pass.length == 6) {
        cmd = [0xFF, 0x82, 0x00, location, 0x06].concat(pass);
    } else {
        cmd = [0xFF, 0x82, 0x00, location, 0x06].concat([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
    }
    card.issueCommand(cmd, (err, res) => {
        if (res.getStatus().addspace() == '90 00') {
            if (location == 0x00) {
                log('加载密钥到00位置成功');
            } else {
                log('加载密钥到01位置成功');
            }
        } else {
            if (location == 0x00) {
                log('加载密钥到00位置失败');
            } else {
                log('加载密钥到01位置失败');
            }
        }
    });
};

auth = function (card, block = 0x00, type = 0x60, location = 0x00) {
    let cmd = [0xFF, 0x86, 0x00, 0x00, 0x05, 0x01, 0x00, block, type, location];
    card.issueCommand(cmd, (err, res) => {
        if (res.getStatus().addspace() == '90 00') {
            log(`通过保存在${location == 0x00 ? '00' : '01'}位置的密钥${type == 0x60 ? 'A' : 'B'}认证块${block}成功`);
        } else {
            log(`通过保存在${location == 0x00 ? '00' : '01'}位置的密钥${type == 0x60 ? 'A' : 'B'}认证块${block}失败[${res.getStatus()}]：${meaning(res.getStatus())}`);
        }
    });
};

readData = function (card, block) {
    let cmd = [0xFF, 0xB0, 0x00, block, 0x10];
    card.issueCommand(cmd, (err, res) => {
        if (res.getStatus().addspace() == '90 00') {
            log(`读取块${block}成功：${res.getData().addspace()}`);
            log(`====${res.getDataBuffer().toString('ascii')}====`)
        } else {
            log(`读取块${block}失败[${res.getStatus()}]：${meaning(res.getStatus())}`);
        }
    });
};

//    loadKey(global.card, 0x00);    //加载密钥A到00
//    loadKey(global.card, 0x01);    //加载密钥B到01
//    auth(global.card, 0x00, 0x60, 0x00);    //从00的密钥A认证块00
//    auth(global.card, 0x00, 0x61, 0x01);    //从01的密钥B认证块00
//    readData(global.card, 0x00);    //读块00
//    auth(global.card, 0x03, 0x60, 0x00);    //从00的密钥A认证块03
//    auth(global.card, 0x03, 0x61, 0x01);    //从01的密钥B认证块03
//    readData(global.card, 0x03);    //读块03

require('./console');
