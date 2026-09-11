function setRole(role) {

    document.getElementById(
        "roleInput"
    ).value = role;

}


async function analyzeRole() {

    const input =
        document.getElementById(
            "roleInput"
        );


    const role =
        input.value.trim();


    const button =
        document.getElementById(
            "analyzeBtn"
        );


    const loading =
        document.getElementById(
            "loading"
        );


    const dashboard =
        document.getElementById(
            "dashboard"
        );


    const errorBox =
        document.getElementById(
            "error"
        );


    if (!role) {

        errorBox.textContent =
            "Please enter a job role.";

        errorBox.classList.remove(
            "hidden"
        );

        return;

    }


    // Reset

    errorBox.classList.add(
        "hidden"
    );

    dashboard.classList.add(
        "hidden"
    );

    loading.classList.remove(
        "hidden"
    );

    button.disabled = true;

    button.textContent =
        "⏳ Analyzing...";


    try {

        const response =
            await fetch(
                `/analyze?role=${encodeURIComponent(role)}`
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Something went wrong."
            );

        }


        // Role

        document.getElementById(
            "roleTitle"
        ).textContent =
            data.role;


        // Statistics

        document.getElementById(
            "jobCount"
        ).textContent =
            data.jobs_analyzed;


        document.getElementById(
            "skillCount"
        ).textContent =
            data.skills_found;


        document.getElementById(
            "topSkill"
        ).textContent =
            data.top_skill;


        // Skills

        const skillList =
            document.getElementById(
                "skillList"
            );


        skillList.innerHTML = "";


        data.skills
            .slice(0, 10)
            .forEach(
                (item, index) => {

                    const div =
                        document.createElement(
                            "div"
                        );


                    div.className =
                        "skill-item";


                    div.innerHTML = `

                        <div
                            class="skill-header"
                        >

                            <span>
                                ${index + 1}.
                                ${item.skill}
                            </span>

                            <span>
                                ${item.percentage}%
                            </span>

                        </div>


                        <div
                            class="progress"
                        >

                            <div
                                class="progress-bar"
                                style="width:
                                ${item.percentage}%"
                            >
                            </div>

                        </div>

                    `;


                    skillList.appendChild(
                        div
                    );

                }
            );


        // Career insight

        const first =
            data.skills[0];


        const second =
            data.skills[1];


        let insightText =
            `For ${data.role}, `;


        if (first) {

            insightText +=
                `${first.skill} is the most frequently requested skill`;

        }


        if (second) {

            insightText +=
                `, followed by ${second.skill}`;

        }


        insightText +=
            " in the analyzed job listings.";


        document.getElementById(
            "insight"
        ).textContent =
            insightText;


        // Job cards

        const jobList =
            document.getElementById(
                "jobList"
            );


        jobList.innerHTML = "";


        data.jobs.forEach(
            job => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "job-card";


                let badges = "";


                job.skills
                    .slice(0, 5)
                    .forEach(
                        skill => {

                            badges += `
                                <span
                                    class="badge"
                                >
                                    ${skill}
                                </span>
                            `;

                        }
                    );


                card.innerHTML = `

                    <h3>
                        ${job.title}
                    </h3>

                    <div
                        class="company"
                    >
                        ${job.company}
                    </div>

                    <div
                        class="location"
                    >
                        📍 ${job.location}
                    </div>

                    <div
                        class="badges"
                    >
                        ${badges}
                    </div>

                    <a
                        class="job-link"
                        href="${job.url}"
                        target="_blank"
                    >
                        View Job →
                    </a>

                `;


                jobList.appendChild(
                    card
                );

            }
        );


        dashboard.classList.remove(
            "hidden"
        );


        // Scroll to results

        dashboard.scrollIntoView({
            behavior: "smooth"
        });


    }

    catch (error) {

        errorBox.textContent =
            error.message;

        errorBox.classList.remove(
            "hidden"
        );

    }

    finally {

        loading.classList.add(
            "hidden"
        );

        button.disabled = false;

        button.textContent =
            "🔍 Analyze";

    }

}