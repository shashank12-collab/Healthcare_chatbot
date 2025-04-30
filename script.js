var t1 = gsap.timeline()

t1.from("#logo img", {
    y: -60,
    opacity: 0,
    duration: 1
});

t1.from("h3",
{
    y:-60,
    opacity:0,
    delay:0.2,
    duration:0.8,
    stagger:0.8
})

function displayReportInNewWindow(answers) {
    const reportWindow = window.open('', '_blank');
    if (!reportWindow) {
        alert('Popup blocked! Please allow popups for this website.');
        return;
    }

    const reportHTML = `
        <html>
        <head>
            <title>Health Report</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background: #f5f8fa;
                    padding: 30px;
                    color: #333;
                }
                .report-container {
                    background: white;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                    text-align: left;
                }
                h2 {
                    text-align: center;
                    color: #1e88e5;
                    margin-bottom: 20px;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                ul li {
                    padding: 8px 0;
                    border-bottom: 1px solid #eee;
                    font-size: 16px;
                }
                strong {
                    color: #555;
                }
                #downloadPdfBtn {
                    margin-top: 20px;
                    display: block;
                    width: 100%;
                    padding: 12px;
                    background-color: #1e88e5;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                }
                #downloadPdfBtn:hover {
                    background-color: #1565c0;
                }
            </style>
        </head>
        <body>
            <div class="report-container">
                <h2>📝 Your Health Report</h2>
                <ul>
                    <li><strong>Name:</strong> ${answers.name || 'N/A'}</li>
                    <li><strong>Age:</strong> ${answers.age || 'N/A'}</li>
                    <li><strong>Gender:</strong> ${answers.gender || 'N/A'}</li>
                    <li><strong>Height:</strong> ${answers.height || 'N/A'}</li>
                    <li><strong>Weight:</strong> ${answers.weight || 'N/A'}</li>
                    ${Object.entries(answers).map(([key, value]) => {
                        if (!["name", "age", "gender", "height", "weight"].includes(key)) {
                            return `<li><strong>${key}:</strong> ${value}</li>`;
                        }
                        return '';
                    }).join('')}
                </ul>
                <button id="downloadPdfBtn">📄 Download PDF</button>
            </div>

            <script>
                document.getElementById('downloadPdfBtn').addEventListener('click', () => {
                    const element = document.querySelector('.report-container');
                    html2pdf().from(element).save('Health_Report.pdf');
                });
            </script>
        </body>
        </html>
    `;

    reportWindow.document.open();
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
}

window.answers = {};
window.displayReportInNewWindow = displayReportInNewWindow;

const questions = [
    { key: 'name', question: 'What is your name?' },
    { key: 'age', question: 'What is your age?' },
    { key: 'gender', question: 'What is your gender?' },
    { key: 'height', question: 'What is your height?' },
    { key: 'weight', question: 'What is your weight?' },
    { key: 'symptoms', question: 'Describe your symptoms?' }
];

function askQuestionsSequentially(index = 0) {
    if (index >= questions.length) {
        displayReportInNewWindow(window.answers);
        return;
    }

    const current = questions[index];
    const answer = prompt(current.question);
    if (answer !== null && answer.trim() !== '') {
        window.answers[current.key] = answer.trim();
    } else {
        window.answers[current.key] = 'Not provided';
    }
    askQuestionsSequentially(index + 1);
}

window.addEventListener("DOMContentLoaded", function () {
    const myReportLink = document.getElementById("My repots") || document.getElementById("My-reports");
    if (myReportLink) {
        myReportLink.addEventListener("click", function (e) {
            e.preventDefault();
            window.answers = {}; 
            askQuestionsSequentially(); 
        });
    }
});
