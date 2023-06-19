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
                tdElement.click()
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
            } else {
                console.log('Button not found.');
            }
            console.log('Today\'s date row:', trElement);
        } else {
            console.log('Today\'s date row not found. Sorry');
        }
    };
});
