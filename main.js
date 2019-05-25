require('./common');
require('./helper');
require('./handle');

getCard = function (card) {
    card.issueCommand([0xFF, 0xCA, 0x00, 0x00, 0x04], (err, res) => {
        if (res.getStatus().addspace() == '90 00') {
            log('卡号：' + res.getData().addspace());
            log('十进制卡号：' + res.getData().HextoDec());
            readCard(card);
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
                log('密钥A加载成功');
            } else {
                log('密钥B加载成功');
            }
        } else {
            if (location == 0x00) {
                log('密钥A加载失败');
            } else {
                log('密钥B加载失败');
            }
        }
    });
};
readCard = function (card) {
    loadKey(card, 0x00);
    loadKey(card, 0x01);
}