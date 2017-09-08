package com.imooc.mvcdemo;

/**
 * Created by Administrator on 2017/9/4.
 */
@Controller
public class TestController {

    @RequestMapping(value = "baseType.do")
    @ResponseBody
    public String baseType(int age) {
        return "age:" + age;
    }
}