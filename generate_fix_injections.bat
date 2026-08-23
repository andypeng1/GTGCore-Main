@echo off
echo 正在编译并运行 GenerateFixInjections2 生成 fix_injections.js...
echo.
call gradlew.bat generateFixInjections
echo.
echo 完成！
pause
