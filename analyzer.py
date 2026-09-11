from skills import SKILLS


def extract_skills(text):

    text = text.lower()

    detected = []

    for skill, keywords in SKILLS.items():

        for keyword in keywords:

            if keyword.lower() in text:

                detected.append(skill)

                break

    return detected


def analyze_jobs(jobs):

    skill_count = {}

    for job in jobs:

        full_text = (
            job["title"]
            + " "
            + job["description"]
        )

        detected_skills = extract_skills(
            full_text
        )

        job["skills"] = detected_skills

        for skill in detected_skills:

            if skill not in skill_count:

                skill_count[skill] = 0

            skill_count[skill] += 1


    total_jobs = len(jobs)

    results = []

    if total_jobs == 0:

        return results


    for skill, count in skill_count.items():

        percentage = (
            count / total_jobs
        ) * 100

        results.append({

            "skill": skill,

            "count": count,

            "percentage": round(
                percentage,
                1
            )

        })


    results.sort(
        key=lambda x: x["percentage"],
        reverse=True
    )


    return results