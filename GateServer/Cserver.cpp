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
				//����ͷ������ӣ�����������������
				if (ec)
				{
					self->start();
					return;
				}
				//����һ�������� ���Ҵ���http������������ 
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
