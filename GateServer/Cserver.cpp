#include "Cserver.h"
#include "HttpConnection.h"
#include"const.h"
Cserver::Cserver(boost::asio::io_context& ioc, unsigned short port)
	:_ioc(ioc)
	,_acceptor(ioc,tcp::endpoint(tcp::v4(),port))
	,_socket(ioc)
{
}

void Cserver::start()
{
	auto self = shared_from_this();
	_acceptor.async_accept(_socket, [self](beast::error_code ec)
		{
			try 
			{
				//出错就放弃链接，继续监听其他链接
				if (ec)
				{
					self->start();
					return;
				}
				//创建一个新链接 并且创建http类管理这个链接 
				//std::make_shared<HttpConnection>(self->_socket);
				std::make_shared<HttpConnection>(std::move(self->_socket))->start();
				//
				self->start();
			}
			catch (std::exception& exp)
			{

			}
		});



}
