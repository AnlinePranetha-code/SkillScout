import requests
from bs4 import BeautifulSoup


BASE_URL = "https://jobicy.com/api/v2/remote-jobs"


def scrape_jobs(role, count=50):

    print(f"\n🔎 Searching Jobicy for: {role}")

    params = {
        "count": count,
        "tag": role
    }

    try:

        response = requests.get(
            BASE_URL,
            params=params,
            timeout=15
        )

        response.raise_for_status()

        data = response.json()

        jobs = data.get("jobs", [])

        cleaned_jobs = []

        for job in jobs:

            title = job.get(
                "jobTitle",
                "Unknown"
            )

            company = job.get(
                "companyName",
                "Unknown"
            )

            location = job.get(
                "jobGeo",
                "Remote"
            )

            description = job.get(
                "jobDescription",
                ""
            )

            # Convert HTML description to plain text
            soup = BeautifulSoup(
                description,
                "html.parser"
            )

            description = soup.get_text(
                separator=" ",
                strip=True
            )

            url = job.get(
                "url",
                "#"
            )

            cleaned_jobs.append({

                "title": title,

                "company": company,

                "location": location,

                "description": description,

                "url": url

            })

        print(
            f"✅ Found {len(cleaned_jobs)} matching jobs"
        )

        return cleaned_jobs

    except Exception as e:

        print(
            f"❌ Scraping error: {e}"
        )

        return []