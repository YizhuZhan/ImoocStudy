import yargs from 'yargs';

//区分开发环境和线上环境
const args = yargs
.option('production',{//如果没有设置-production这样的option，则默认值为false，否则为true
    boolean: true,
    default: false,
    describe: 'min all scripts'//本句机器不识别
})

.option('watch',{//改了js,css等文件是否要自动编译，通过命令行watch来控制
    boolean:true,
    default:false,
    describe:'watch all files'
})

.option('verbose',{//是否要详细输出命令行执行的日志
    boolean:true,
    default:false,
    describe:'log'
})

.option('sourcemaps',{//做映射，js压缩以后有一个sourcemaps
    boolean:true,
    default:false,
    describe:'force the creation of sourcemaps'
})

.option('port',{
    String:true,
    default:8080,
    describe:'server port'
})

.argv

export default args;