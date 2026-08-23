@echo off
REM 编译 GenerateFixInjections2.java
javac -cp asm-9.9.1.jar;asm-tree-9.9.1.jar GenerateFixInjections2.java

REM 运行 GenerateFixInjections2 重新生成 fix_injections.js
REM 参数: <mods目录> <output.srg> <输出js路径>
java -cp .;asm-9.9.1.jar;asm-tree-9.9.1.jar GenerateFixInjections2 ..\run\mods ..\build\createSrgToMcp\output.srg ..\src\devcompat\resources\coremods\fix_injections.js

echo 完成！
pause
