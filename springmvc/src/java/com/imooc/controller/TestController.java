package com.imooc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Administrator on 2017/8/28.
 */
@Controller
public class TestController {

    @RequestMapping(value="baseType.do")
    @ResponseBody
    public String baseType(int age){
        return "age:"+age;
    }

