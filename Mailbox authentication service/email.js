const nodemailer = require('nodemailer');
const config_module = require("./config.json")
/**
 * 创建发送邮件的代理
 */


let transport = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
        user: config_module.email_user, // 发送方邮箱地址
        pass: config_module.email_pass, // 邮箱授权码或者密码      
    }
}); 
 /**
 * 发送邮件的函数
 * @param {*} mailOptions_ 发送邮件的参数 
 * @returns  {Promise} 返回一个Promise对象
 */
function SendMail(mailOptions_){   // 定义一个发送邮件的函数
    console.log("start send email")
    return new Promise(function(resolve, reject){    // 返回一个Promise对象
        transport.sendMail(mailOptions_, function(error, info){ // 发送邮件的函数
            if (error) {
                console.log("//////////////////////"+config_module.email_user)
                console.log("////////////////////////////"+config_module.email_pass)
                console.log(error); // 打印出错误信息
                reject(error);  // 发送失败
            } else {
                console.log('邮件已成功发送：' + info.response); // 打印出发送邮件的结果
                resolve(info.response) // 返回发送成功的提示信息
            }
        });
    })
}
module.exports.SendMail = SendMail  // 导出发送邮件的函数