import threading
import webbrowser


from flask import (
    Flask,
    jsonify,
    request,
    send_from_directory
)

from scrapper import scrape_jobs
from analyzer import analyze_jobs


app = Flask(__name__)

WEB_FOLDER = "web"


@app.route("/")
def home():

    return send_from_directory(
        WEB_FOLDER,
        "index.html"
    )


@app.route("/<path:filename>")
def static_files(filename):

    return send_from_directory(
        WEB_FOLDER,
        filename
    )


@app.route("/analyze")
def analyze():

    role = request.args.get(
        "role",
        ""
    ).strip()


    if not role:

        return jsonify({

            "error":
            "Please enter a job role."

        }), 400


    # Scrape jobs for the requested role
    jobs = scrape_jobs(
        role,
        50
    )


    if not jobs:

        return jsonify({

            "error":
            f"No jobs found for '{role}'."

        }), 404


    # Analyze skills
    skills = analyze_jobs(
        jobs
    )


    top_skill = (
        skills[0]["skill"]
        if skills
        else "N/A"
    )


    result = {

        "role": role,

        "jobs_analyzed":
            len(jobs),

        "skills_found":
            len(skills),

        "top_skill":
            top_skill,

        "skills":
            skills,

        "jobs":
            jobs[:10]

    }


    return jsonify(result)


def open_browser():

    webbrowser.open(
        "http://127.0.0.1:5000"
    )


if __name__ == "__main__":

    print("""
========================================
          ⚡ SKILLSCOUT
      Job Market Skill Analyzer
========================================
    """)

    print(
        "🌐 Starting dashboard..."
    )

    threading.Timer(
        1.5,
        open_browser
    ).start()


    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )