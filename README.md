<p align="center"> <b>📊 Social Media Manager Agent </b><br> Built with Node.js & Express </p> <p align="center"> <img src="https://img.shields.io/badge/build-passing-brightgreen" /> <img src="https://img.shields.io/badge/version-1.0.0-blue" /> <img src="https://img.shields.io/badge/license-MIT-yellow" /> <img src="https://img.shields.io/badge/node-18%2B-green" /> </p>


A backend-driven Social Media Post Scheduling & Analytics System built with Node.js and Express.



🚀 Project Overview

Social Media Manager is a lightweight scheduling engine that allows users to:

Create and schedule posts

Automatically resolve time conflicts

Prevent duplicate topics

Calculate engagement score

Suggest best posting time based on historical engagement

View all scheduled posts in a structured dashboard

This project focuses on clean backend architecture, separation of concerns, and modular agent-based logic





🧠 Core Architecture

Client (HTML + JS)
        ↓
Express Controller (index.js)
        ↓
Business Logic Agents
        ↓
JSON File Storage

📦Agents Used

postAgent.js

 .Post creation logic

 .Duplicate validation

engagementAgent.js

. Calculates engagement score


schedulingAgent.js

. Suggests best posting time

Auto schedules posts

. Uses engagement history




✨ Features
📌 Post Scheduling

Manual time scheduling (HH:MM format)

Automatic scheduling if time not provided

Time conflict auto-resolution

⚠️ Conflict Handling

Duplicate topic prevention

Time conflict detection

Automatic delay with alert notification




📊 Smart Time Suggestion

Calculates total engagement per time slot

Recommends highest performing time





🎨 Dashboard

Clean UI layout

Real-time post listing

Engagement metrics display

Dynamic alert system





🛠 Tech Stack

 Layer       Technology                    
 Backend    | Node.js                       
 Framework  | Express                       
 Frontend   | HTML, CSS, Vanilla JavaScript 
 Storage    | JSON File                     
 Versioning | Git & GitHub                  





📌 What This Project Demonstrates

Modular backend architecture

Agent-based logic separation

REST API structure

Conflict resolution strategy

Engagement scoring algorithm

File-based data persistence




