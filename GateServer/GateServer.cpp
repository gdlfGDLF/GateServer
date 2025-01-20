#include <iostream>
#include <string>
#include "boost/lexical_cast.hpp"
#include "json.h"


#include <value.h>
#include <reader.h>
#include"const.h"
#include "Cserver.h"

int main()
{
	try
	{
		unsigned short port = static_cast<unsigned short>(8080);
		net::io_context ioc{ 1 };
		boost::asio::signal_set signals(ioc, SIGINT, SIGTERM);
		signals.async_wait([&ioc](const boost::system::error_code& error, int signale_number) {
			if (error)
			{
				std::cout << "error in signals is" << error.value();
				return;
			}
			ioc.stop();
			});

		std::make_shared<Cserver>(ioc, port)->start();
		std::cout << "Gate server listen on port" << port << std::endl;
		ioc.run();
	}
	catch (const std::exception & e)
	{
		std::cerr << "Error;" << e.what() << std::endl;
		return EXIT_FAILURE;
	}
 
}