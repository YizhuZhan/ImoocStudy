package com.imooc.mvcdemo.service;

import org.springframework.stereotype.Service;

import com.imooc.mvcdemo.model.*;

@Service
public interface CourseService {
	
	public Course getCourseById(Integer courseId);
	
}
