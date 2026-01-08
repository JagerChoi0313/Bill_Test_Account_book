//配置项
//这段代码是 Webpack 别名配置，用于简化模块路径引用。
// 它定义了一个别名 @，将 @ 指向项目的 src 目录，
// 这样在代码中就可以通过 @/components/Button
// 来代替相对路径 ../../src/components/Button，提高代码可读性和维护性。

const path =require('path')

module.exports={

    //webpack配置
    webpack:{
        //配置别名
      alias:{
        //约定：使用@表示src文件所在路径
        '@':path.resolve(__dirname,'src')
        }
    }
}

//Webpack 是一个现代前端构建工具，
// 它将项目中各种资源（JS、CSS、图片等）视为模块，
// 通过依赖分析将它们打包、转换和优化，生成适合浏览器运行的静态文件。


