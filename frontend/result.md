# Courses Page Implementation (Frontend)

## Summary
- Implemented Courses Page with backend integration
- Users can view all available courses
- Students can enroll in courses

## Files Created/Modified
- services/courseService.js
- app/courses/page.js

## Features
- Fetch courses from backend API
- Display course cards
- Enroll functionality integrated
- Token-based authentication for API calls

## API Integration
- GET /api/courses
- POST /api/courses/enroll/:courseId

# Assignment Page Implementation (Frontend)

## Summary
- Implemented Assignments Page with submission feature
- Students can view assignments and submit responses

## Files Created/Modified
- services/assignmentService.js
- app/assignments/page.js

## Features
- Fetch assignments from backend
- Display assignment details
- Submit assignment responses
- Token-based API integration

## API Integration
- GET /api/assignments
- POST /api/submissions

## Current Frontend Status
- Layout & Navigation ✅
- Login System ✅
- Role-based Dashboard ✅
- Courses Page ✅
- Assignments Page (Fetch + Submit) ✅

## Next Step
- Route protection + UI polish
