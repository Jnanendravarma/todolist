@echo off
echo ===========================================
echo        MONGODB DATABASE VIEWER
echo ===========================================
echo.
echo Connecting to MongoDB...
echo Database: work
echo Collection: listt
echo.

REM Try to find MongoDB shell (mongosh or mongo)
where mongosh >nul 2>&1
if %errorlevel% == 0 (
    echo Using mongosh...
    mongosh --eval "use work; db.listt.find().pretty()"
) else (
    where mongo >nul 2>&1
    if %errorlevel% == 0 (
        echo Using mongo shell...
        mongo work --eval "db.listt.find().pretty()"
    ) else (
        echo MongoDB shell not found in PATH.
        echo Please use MongoDB Compass or our Node.js script.
        echo.
        echo Running our custom database viewer...
        node "C:\Users\Jnanendravarma927\Downloads\todolist\backend\check-database.js"
    )
)

echo.
echo ===========================================
pause