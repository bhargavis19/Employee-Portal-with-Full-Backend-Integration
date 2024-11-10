const requestForm = document.querySelector("#requestForm")

requestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = document.querySelector("#requestaccessBtn")
    submitBtn.innerHTML = 'Submitting'
    const { message, success } = await handleRequestAccess()
    if (success) {
        submitBtn.innerHTML = 'Submitted'
    } else {
        const msgRenderer = document.getElementById("msgRenderer")
        msgRenderer.innerText = message;
        msgRenderer.style.color = 'red'
        submitBtn.innerHTML = 'Submit'
        setTimeout(() => {
            msgRenderer.innerText = ''
        }, 2000);
    }
})

/**
 * @returns {{success: boolean, message: string}}
 */
async function handleRequestAccess() {
    try {
        const empID = prompt("Enter employee ID")
        const messageEle = document.querySelector('#message')
        const emailAddressEle = document.querySelector('#emailaddress')
        const appNameEle = document.querySelector('#appName')
        if (!emailAddressEle.value || !appNameEle.value) {
            return { success: false, message: "Please fill the required details" }
        }
        const payload = {
            "EmployeeID": empID, // needs to change
            "ApplicationName": appNameEle.value,
            "EmailAddress": emailAddressEle.value,
            "Messages": messageEle.value
        }

        let apiRes = await fetch('http://localhost:4000/api/v1/request-access', {
            body: JSON.stringify(payload), method: "POST", headers: {
                'Content-Type': "application/json"
            }
        })
        if (!apiRes.ok) {
            return { success: false, message: "Something went wrong! Please check the data" }
        }
        apiRes = await apiRes.json()

        return { success: true, message: "Request Sent Successfully" }
    } catch (error) {
        return { success: false, message: error.message }
    }
}