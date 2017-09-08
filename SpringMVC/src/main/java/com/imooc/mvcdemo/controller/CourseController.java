package com.imooc.mvcdemo.controller;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.imooc.mvcdemo.model.Course;
import com.imooc.mvcdemo.service.CourseService;



@Controller
@RequestMapping("/courses")
public class CourseController {
	
	private CourseService courseService;
	
	@Autowired
	public void setCourseService(CourseService courseService) {
		this.courseService = courseService;
	}

	@RequestMapping("/view1")
	public String view1(@RequestParam Integer courseId, Model model){
		Course course = courseService.getCourseById(courseId);
		model.addAttribute(course);
		return "course_overview";
	}
	
	@RequestMapping("/view2/{courseId}")
	public String view2(@PathVariable Integer courseId, Map<String, Object> map){
		Course course = courseService.getCourseById(courseId);
		map.put("course", course);
		return "course_overview";
	}
	
	@RequestMapping("/view3")
	public String view3(HttpServletRequest request){
		Integer courseId = Integer.valueOf(request.getParameter("courseId"));
		Course course = courseService.getCourseById(courseId);
		
		request.setAttribute("course",course);
		return "redirect:view2/"+course.getCourseId();
	}
	
	/**
	 * Q：此方法行不通，session可能不能从URL地址中获取参数
	 * @param session
	 * @return
	 */
	@RequestMapping("/view4")
	public String view4(HttpSession session){
		
		Integer courseId = Integer.valueOf((String)session.getAttribute("courseId"));
		Course course = courseService.getCourseById(courseId);
		session.setAttribute("course", course);
		return "forward:view2/"+course.getCourseId();
	}
	
	/**
	 * 以下两个方法：如何将表单上传的数据绑定到模型中
	 * @return
	 */
	@RequestMapping("/admin")
	public String createCourse(){
		
		return "course_admin/edit";
	}
	
	@RequestMapping(value="/save", method=RequestMethod.POST)
	public String saveCourseToFile(@ModelAttribute Course course){
		course.setCourseId(123);
		return "redirect:view2/"+course.getCourseId();
	}
	
	/**
	 * 文件上传
	 * @param file
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/upload",method=RequestMethod.GET)
	public String showUploadPage(@RequestParam(value="multi",required=false) Boolean multi){
		if(multi!=null && multi){
			return "course_admin/multifile"; 
		}
		return "course_admin/file";
	}
	
	@RequestMapping(value="/doUpload",method=RequestMethod.POST)
	public String doUploadFile(@RequestParam("file") MultipartFile file) throws IOException{
		if(!file.isEmpty()){
			FileUtils.copyInputStreamToFile(file.getInputStream(), new File("C:\\temp\\imooc", System.currentTimeMillis()+file.getOriginalFilename()));
		}
		return "success";
	}
	
	@RequestMapping(value = "/doUpload2", method=RequestMethod.POST)
	public String doUploadMultiFiles( MultipartHttpServletRequest multiRequest) throws IOException{
		Iterator<String> fileNames = multiRequest.getFileNames();
		while(fileNames.hasNext()){
			String fileName = fileNames.next();
			MultipartFile file = multiRequest.getFile(fileName);
			if(!file.isEmpty()){
				FileUtils.copyInputStreamToFile(file.getInputStream(), new File("C:\\temp\\imooc", System.currentTimeMillis()+file.getOriginalFilename()));
			}
		}
		return "success";
	}
	
	@RequestMapping(value="/{courseId}", method=RequestMethod.GET)
	public @ResponseBody Course showJSON1(@PathVariable Integer courseId){
		return courseService.getCourseById(courseId);
	}
	
	@RequestMapping(value="/jsontype/{courseId}", method=RequestMethod.GET)
	public ResponseEntity<Course> showJSON2(@PathVariable Integer courseId){
		Course course = courseService.getCourseById(courseId);
		return new ResponseEntity<Course>(course,HttpStatus.OK);
	}

}
