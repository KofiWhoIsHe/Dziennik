document.addEventListener("DOMContentLoaded", () => {
    // Zmienne do obsługi ocen
    let cSub = document.getElementById("przedmiot");
    let gradesTbl = document.getElementById("gradesTable") ? document.getElementById("gradesTable").getElementsByTagName('tbody')[0] : null;
    let addGradeFrm = document.getElementById("addGradeForm");

    // Funkcja do wyświetlania ocen
    if (cSub) {
        cSub.addEventListener("change", () => {
            console.log(cSub.value);

            fetch(`http://localhost:3000/show-grades/${cSub.value}`)
                .then(function(res) {
                    if (!res.ok) {
                        throw new Error(`Server error: ${res.status}`);
                    }
                    return res.json();
                })
                .then(function(grades) {
                    console.log("Parsed grades:", grades);
                    gradesTbl.innerHTML = "";

                    if (!grades || grades.length === 0) {
                        console.log("No grades for this subject.");
                        return;
                    }

                    for (let i = 0; i < grades.length; i++) {
                        let row = gradesTbl.insertRow();
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        cell1.innerHTML = cSub.value;
                        cell2.innerHTML = grades[i].Ocena;
                        cell3.innerHTML = new Date(grades[i].Data_dodania).toLocaleDateString('pl-PL');
                    }
                })
                .catch(function(error) {
                    console.error("Error fetching data:", error);
                });
        });
    }

    // Funkcja do dodawania ocen
    if (addGradeFrm) {
        addGradeFrm.addEventListener("submit", function(event) {
            event.preventDefault();
            const przedmiot = document.getElementById("przedmiot").value;
            const ocena = document.getElementById("ocena").value;

            fetch(`http://localhost:3000/add-grade/${przedmiot}/${ocena}`, {
                method: "GET"
            })
                .then(function(res) {
                    if (!res.ok) {
                        throw new Error(`Server error: ${res.status}`);
                    }
                    return res.text();
                })
                .then(function(result) {
                    console.log(result);
                    cSub.value = przedmiot;
                    cSub.dispatchEvent(new Event('change'));
                })
                .catch(function(error) {
                    console.error("Error adding grade:", error);
                });
        });
    }

    // Plan lekcji
    const planTyg = [
        [
            { godz: "8:00-8:45", przedm: "Matematyka", nauczyc: "Jan Kowalski", sala: "101" },
            { godz: "9:00-9:45", przedm: "Biologia", nauczyc: "Anna Nowak", sala: "102" }
        ],
        [
            { godz: "8:00-8:45", przedm: "Chemia", nauczyc: "Piotr Wiśniewski", sala: "103" },
            { godz: "9:00-9:45", przedm: "Historia", nauczyc: "Maria Kowalska", sala: "104" }
        ],
        [
            { godz: "8:00-8:45", przedm: "Fizyka", nauczyc: "Tomasz Zieliński", sala: "105" },
            { godz: "9:00-9:45", przedm: "Geografia", nauczyc: "Ewa Wiśniewska", sala: "106" }
        ],
        [
            { godz: "8:00-8:45", przedm: "Język Polski", nauczyc: "Katarzyna Nowak", sala: "107" },
            { godz: "9:00-9:45", przedm: "Język Angielski", nauczyc: "Robert Lewandowski", sala: "108" }
        ],
        [
            { godz: "8:00-8:45", przedm: "W-F", nauczyc: "Michał Kwiatkowski", sala: "Sala gimnastyczna" },
            { godz: "9:00-9:45", przedm: "Informatyka", nauczyc: "Agnieszka Kowalczyk", sala: "109" }
        ]
    ];

    // Wyswietlanie tabeli
    function genPlanTbl() {
        const tblBody = document.querySelector("#planTable tbody");

        const maxLessons = Math.max.apply(null, planTyg.map(function(day) { return day.length; }));

        for (let i = 0; i < maxLessons; i++) {
            const row = document.createElement("tr");

            const lessonNumCell = document.createElement("td");
            lessonNumCell.textContent = i + 1;
            row.appendChild(lessonNumCell);

            const lessonTimeCell = document.createElement("td");
            lessonTimeCell.textContent = planTyg[0][i] ? planTyg[0][i].godz : "";
            row.appendChild(lessonTimeCell);

            for (let j = 0; j < planTyg.length; j++) {
                const lessonCell = document.createElement("td");
                if (planTyg[j][i]) {
                    lessonCell.innerHTML = planTyg[j][i].przedm + "<br>" + planTyg[j][i].nauczyc + "<br>" + planTyg[j][i].sala;
                }
                row.appendChild(lessonCell);
            }

            tblBody.appendChild(row);
        }
    }

    genPlanTbl();

    // Dzisiejsze lekcje
    function getTodayLessons() {
        const today = new Date().getDay() - 1;
        if (today < 0 || today > 4) {
            return [];
        }
        return planTyg[today];
    }

    function displayTodayLessons() {
        const lessons = getTodayLessons();
        const lessonsList = document.getElementById("dzisiejszeLekcje");
        lessonsList.innerHTML = "";

        if (lessons.length === 0) {
            lessonsList.innerHTML = "<li>Brak lekcji dzisiaj</li>";
        } else {
            for (let i = 0; i < lessons.length; i++) {
                const listItem = document.createElement("li");
                listItem.innerHTML = lessons[i].godz + " - " + lessons[i].przedm + " (" + lessons[i].nauczyc + ", sala: " + lessons[i].sala + ")";
                lessonsList.appendChild(listItem);
            }
        }
    }

    // Najnowsze oceny
    function fetchLatestGrades() {
        return fetch(`http://localhost:3000/latest-grades`)
            .then(function(res) {
                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`);
                }
                return res.json();
            })
            .catch(function(error) {
                console.error("Error fetching latest grades:", error);
                return [];
            });
    }

    function displayLatestGrades() {
        fetchLatestGrades().then(function(grades) {
            const gradesList = document.getElementById("najnowszeOceny");
            gradesList.innerHTML = "";

            if (grades.length === 0) {
                gradesList.innerHTML = "<li>Brak ocen</li>";
            } else {
                for (let i = 0; i < grades.slice(0, 5).length; i++) {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = grades[i].Przedmiot + ": " + grades[i].Ocena + " (" + new Date(grades[i].Data_dodania).toLocaleDateString('pl-PL') + ")";
                    gradesList.appendChild(listItem);
                }
            }
        });
    }

    // Wywołanie funkcji
    if (document.getElementById("dzisiejszeLekcje")) {
        displayTodayLessons();
    }
    if (document.getElementById("najnowszeOceny")) {
        displayLatestGrades();
    }
});