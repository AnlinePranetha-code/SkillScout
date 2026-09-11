# ⚡ SkillScout – Job Market Skill Analyzer

A **web scraping-based job market analyzer** that collects job listings and identifies the most demanded technical skills for different job roles.

## 📌 Overview

SkillScout helps students and job seekers understand what skills are currently required in the job market.

The application searches for job listings using the **Jobicy API**, extracts and cleans job descriptions, detects technical skills, and displays the results through an interactive web dashboard.

## ✨ Features

* 🔎 Search jobs based on a specific role
* 🌐 Collect job listings using web scraping/API-based data retrieval
* 🧹 Clean job descriptions using BeautifulSoup
* 🧠 Identify technical skills from job descriptions
* 📊 Calculate skill demand percentages
* 🏆 Identify the most demanded skill
* 💼 Display matching job listings
* 📈 Interactive and responsive dashboard
* 💡 Provide career insights based on skill demand

## 🛠️ Technologies Used

### Backend

* Python
* Flask
* Requests
* BeautifulSoup

### Frontend

* HTML
* CSS
* JavaScript

### Data Source

* Jobicy Remote Jobs API

## 📂 Project Structure

```text
SkillScout/
│
├── main.py
├── scrapper.py
├── analyzer.py
├── skills.py
│
├── web/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
└── README.md
```

## 🔄 How It Works

```text
User enters Job Role
        ↓
Flask Backend
        ↓
Jobicy API
        ↓
Job Listings Retrieved
        ↓
Job Descriptions Cleaned
        ↓
Technical Skills Detected
        ↓
Skill Demand Calculated
        ↓
Results Displayed on Dashboard
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/SkillScout.git
```

### 2. Open the project

```bash
cd SkillScout
```

### 3. Install dependencies

```bash
pip install flask requests beautifulsoup4
```

### 4. Run the application

```bash
python main.py
```

The application will start at:

```text
http://127.0.0.1:5000
```

The browser will open automatically when the application starts.

## 🖥️ Usage

1. Enter a job role such as:

   * Python Developer
   * Java Developer
   * Data Scientist
   * Frontend Developer
2. Click **Analyze**.
3. SkillScout collects relevant job listings.
4. The application analyzes the job descriptions.
5. The dashboard displays:

   * Number of jobs analyzed
   * Number of skills found
   * Most demanded skill
   * Skill demand percentages
   * Matching job listings

## 📊 Example Output

For a selected job role, the dashboard provides insights such as:

```text
Jobs Analyzed: 50
Skills Found: 12
Top Skill: Python

Python       ████████████████████ 80%
SQL          ███████████████      60%
JavaScript   ███████████          45%
Git          ██████████           40%
```

## 🎯 Project Objectives

* Analyze current job market requirements.
* Identify frequently requested technical skills.
* Help students understand which skills to learn.
* Provide job-market insights through data analysis.
* Demonstrate the practical use of web scraping and web technologies.


## 📄 License

This project is created for **academic and educational purposes**.
