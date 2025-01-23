const grpc = require('@grpc/grpc-js')
const message_proto = require('./proto')
const const_module = require('./const')
const{ v4: uuidv4 } = require('uuid')
const emailModule = require('./email')
// 定义服务端函数
// 发送验证码
// 输入参数：email
// 输出参数：验证码
// 错误码：成功：0，异常：-1
// 接口：GetVarifyCode
// 功能：根据邮箱地址发送验证码

async function GetVarifyCode(call, callback) {
    console.log("email is ", call.request.email)
    try{ 
        uniqueId = uuidv4();
        console.log("uniqueId is ", uniqueId)
        let text_str =  '您的验证码为'+ uniqueId +'请三分钟内完成注册'
        console.log("text_str is ", text_str)
        //发送邮件
        let mailOptions = { 
            from: 'fni049648@163.com',
            to: call.request.email,
            subject: '验证码', 
            text: text_str, 
        };
        let send_res = await emailModule.SendMail(mailOptions); //等待promise返回结果
        console.log("send res is ", send_res)
        callback(null, { email:  call.request.email,
            error:const_module.Errors.Success
        }); 
    }catch(error){
        console.log("catch error is ", error)   
        callback(null, { email:  call.request.email,
            error:const_module.Errors.Exception 
        }); 
    }
}
function main() { 
    var server = new grpc.Server()  
    server.addService(message_proto.VarifyService.service, { GetVarifyCode: GetVarifyCode }) 
    server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start()
        console.log('grpc server started')        
    })
}
main() 