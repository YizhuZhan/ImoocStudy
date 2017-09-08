package com.imooc.mvcdemo.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.imooc.mvcdemo.model.Chapter;
import com.imooc.mvcdemo.model.Course;
import com.imooc.mvcdemo.service.CourseService;

@Service("courseService")
public class CourseServiceImpl implements CourseService {

	public Course getCourseById(Integer courseId) {
		Course course = new Course();
		course.setCourseId(courseId);
		course.setTitle("Ivana的小网站");
		course.setLevel(2);
		course.setImgPath("resources/imgs/course-img.jpg");
		course.setLearningNum(1000);
		course.setDuration(99999L);
		course.setLevel(2);
		course.setLevelDesc("中等难度");
		course.setDescr("很好的课程哦");
		
		List<Chapter> chapterList = new ArrayList<Chapter>();
		wrapchapterlist(courseId,chapterList);
		course.setChapterList(chapterList);
		return course;
	}
	
	public void wrapchapterlist(Integer courseId, List<Chapter> chapterList){
		Chapter chapter1 = new Chapter();
		chapter1.setId(1);
		chapter1.setCourseId(courseId);
		chapter1.setOrder(1);
		chapter1.setTitle("第一章");
		chapter1.setDescr("这是第一章");
		chapterList.add(chapter1);
		
		Chapter chapter2 = new Chapter();
		chapter2.setId(2);
		chapter2.setCourseId(courseId);
		chapter2.setOrder(2);
		chapter2.setTitle("第二章");
		chapter2.setDescr("这是第二章");
		chapterList.add(chapter2);
		
		Chapter chapter3 = new Chapter();
		chapter3.setId(3);
		chapter3.setCourseId(courseId);
		chapter3.setOrder(3);
		chapter3.setTitle("第三章");
		chapter3.setDescr("这是第三章");
		chapterList.add(chapter3);
	}

}
