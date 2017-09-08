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
		course.setTitle("Ivana��С��վ");
		course.setLevel(2);
		course.setImgPath("resources/imgs/course-img.jpg");
		course.setLearningNum(1000);
		course.setDuration(99999L);
		course.setLevel(2);
		course.setLevelDesc("�е��Ѷ�");
		course.setDescr("�ܺõĿγ�Ŷ");
		
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
		chapter1.setTitle("��һ��");
		chapter1.setDescr("���ǵ�һ��");
		chapterList.add(chapter1);
		
		Chapter chapter2 = new Chapter();
		chapter2.setId(2);
		chapter2.setCourseId(courseId);
		chapter2.setOrder(2);
		chapter2.setTitle("�ڶ���");
		chapter2.setDescr("���ǵڶ���");
		chapterList.add(chapter2);
		
		Chapter chapter3 = new Chapter();
		chapter3.setId(3);
		chapter3.setCourseId(courseId);
		chapter3.setOrder(3);
		chapter3.setTitle("������");
		chapter3.setDescr("���ǵ�����");
		chapterList.add(chapter3);
	}

}
