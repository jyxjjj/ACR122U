//#region 全局事件
//device-activated
activated = function (event) {
    log(`设备 ${event.device} 已连接`);
    /*
    event.devices.map(
        (device, index) => {
            log(`设备 #${index + 1}: '${device.name}'`);
        }
    );
    */
    let device = event.device;
    device.on('card-inserted', inserted);
    device.on('card-removed', removed);
};
//device-deactivated
deactivated = function (event) {
    log(`设备 '${event.device}' 断开连接`);
    event.devices.map(map);
};
//error
error = function (err) {
    log(err.error);
};
//#endregion
//#region 设备事件
//card-inserted
inserted = function (obj) {
    obj.card.atr = obj.card.atr.addspace();
    log(`${obj.device.getName()} 有卡插入`);
    log(`ATR: ${obj.card.atr}`);
    //#region 卡类型ATR
    let M1 = '3B 8F 80 01 80 4F 0C A0 00 00 03 06 03 00 01 00 00 00 00 6A';
    let M4 = '3B 8F 80 01 80 4F 0C A0 00 00 03 06 03 00 02 00 00 00 00 6A';
    let MU = '3B 8F 80 01 80 4F 0C A0 00 00 03 06 03 00 03 00 00 00 00 6A';
    let MM = '3B 8F 80 01 80 4F 0C A0 00 00 03 06 03 00 26 00 00 00 00 6A';
    let TJ = '3B 8F 80 01 80 4F 0C A0 00 00 03 06 03 F0 04 00 00 00 00 6A';
    let F2 = '3B 8F 80 01 80 4F 0C A0 00 00 03 06 03 F0 11 00 00 00 00 6A';
    let F4 = '3B 8F 80 01 80 4F 0C A0 00 00 03 06 03 F0 12 00 00 00 00 6A';
    let FF = '3B 8F 80 01 80 4F 0C A0 00 00 03 06 03 FF 00 00 00 00 6A';
    //#endregion
    //#region 判断卡类型
    switch (obj.card.atr) {
        case M1:
            log('此卡为Mifare 1K卡');
            getCard(obj.card);
            break;
        //#region 非M1卡
        case M4:
            log('此卡为Mifare 4K卡');
            break;
        case MU:
            log('此卡为Mifare Ultralight卡');
            break;
        case MM:
            log('此卡为Mifare Mini卡');
            break;
        case TJ:
            log('此卡为Topaz卡或Jewel卡');
            break;
        case F2:
            log('此卡为FeliCa 212K卡');
            break;
        case F4:
            log('此卡为FeliCa 424K卡');
            break;
        case FF:
            log('此卡为未定义卡');
            break;
        default:
            log('此卡为未知类型卡');
            break;
        //#endregion
    }
    //#endregion
    obj.card.on('command-issued', issued);
    obj.card.on('response-received', received);
};
//card-removed
removed = function (obj) {
    log(`${obj.name}上的卡被拔出`);
};
//#endregion
//#region 卡事件
issued = function (obj) {
    let card = obj.card;
    let cmd = obj.command;
};
received = function (obj) {
    let card = obj.card;
    let cmd = obj.command;
    let res = obj.response;
};
//#endregion
const Devices = require('smartcard').Devices;
const devices = new Devices();
devices.on('device-activated', activated);
devices.on('device-deactivated', deactivated);
devices.on('error', error);
