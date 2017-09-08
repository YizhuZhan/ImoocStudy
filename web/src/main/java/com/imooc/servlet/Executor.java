package com.imooc.servlet;

import java.util.Date;

import javax.servlet.AsyncContext;

public class Executor implements Runnable {
	AsyncContext context;
	public Executor(AsyncContext context){
		this.context = context;
	}
	public void run() {
		try {
			Thread.sleep(1000*10);
			//context.getRequest();
			//context.getResponse();
			System.out.print(new Date());
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
