console.log("Extension content script loaded!");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log("request: ", request);
    if (request.action === 'performAction') {


        // Find all the <td> elements with the specified class
        const tdElements = document.querySelectorAll('td');

        // Get the current date in the format "Tuesday, 20th June 2023"
        // const currentDate = new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        const currentDate = "Tuesday, 13th June 2023"

        let targetTdElement;
        {
            for (const tdElement of tdElements) {
                const spanElement = tdElement.querySelector('span');
                if (spanElement.textContent.trim() === currentDate) {
                    targetTdElement = tdElement;
                    break;
                }
            }
        }

        if (targetTdElement) {

            const trElement = targetTdElement.closest('tr');
            // Find the <a> element inside the target <td> element, it is inside the seventh <td> element inside the trElement
            const buttonElement = trElement.querySelector('td:nth-child(7) a');

            if (buttonElement) {
                buttonElement.click();
                setTimeout(() => {
                    const absentButton = document.querySelector('#mui-component-select-absent');
                    if (absentButton) {
                        absentButton.click();
                        const listElement = document.querySelector('.MuiMenu-list');
                        const nameElements = listElement.querySelectorAll('li');

                        const names = Array.from(nameElements).map((nameElement) => {
                            return nameElement.textContent.trim();
                        });

                        console.log(names);
                        console.log('Absent button clicked.', absentButton);
                    } else {
                        console.log('Absent button not found.');
                    }
                }, 1000);
            } else {
                console.log('Button not found.');
            }
            console.log('Today\'s date row:', trElement);
        } else {
            console.log('Today\'s date row not found. Sorry');
        }
    };
});
