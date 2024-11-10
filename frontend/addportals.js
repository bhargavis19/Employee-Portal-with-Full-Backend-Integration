function handleFileSelect(input) {
    const fileDisplay = document.getElementById('fileDisplay');
    const fileName = document.getElementById('fileName');
    const removeFileButton = document.getElementById('removeFileButton');
    const fileSizeError = document.getElementById('fileSizeError');

    if (input.files && input.files[0]) {
        const file = input.files[0];

        // Check file size if necessary (example: max 2MB)
        if (file.size > 200 * 1024 * 1024) {
            fileSizeError.textContent = "File size exceeds 2MB";
            input.value = ""; // Clear the input
            return;
        } else {
            // fileSizeError.textContent = "";
        }

        // fileName.textContent = file.name;
        fileDisplay.classList.add('active');
        // removeFileButton.style.display = 'flex';
    }
}

function removeFile() {
    const input = document.getElementById('imageUpload');
    const fileDisplay = document.getElementById('fileDisplay');
    const fileName = document.getElementById('fileName');
    const removeFileButton = document.getElementById('removeFileButton');
    const fileSizeError = document.getElementById('fileSizeError');

    input.value = "";
    fileName.textContent = "";
    fileDisplay.classList.remove('active');
    removeFileButton.style.display = 'none';
    fileSizeError.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    loadCategories()
})

async function loadCategories() {
    const select = document.getElementById("categorization");
    select.innerHTML = '';
    console.log('categories loading');
    let categories = await fetch('http://localhost:4000/api/v1/categories')
    categories = await categories.json()
    if (categories.data && Array.isArray(categories.data)) {
        categories.data.forEach(category => {
            const option = document.createElement('option');
            option.id = "CatOpt_" + category.CategoryID;
            option.value = category.CategoryID;
            option.innerText = category.CategoryName;
            select.appendChild(option)
        });
    }
}

const ApplicationForm = document.getElementById('ApplicationForm')

ApplicationForm.addEventListener("submit", postApplication)

/** @param {SubmitEvent} e */
// async function postApplication(e) {
//     e.preventDefault()
//     const applicationID = prompt("Enter the applicationID");
//     const category = document.getElementById("categorization");
//     const appDescription = document.getElementById("appDescription").value;
//     const appName = document.getElementById("appName").value;
//     const appLink = document.getElementById("appLink").value;
//     const imageupload = (document.getElementById("imageUpload").files?.[0]);
//     const submitBtn = document.getElementById("addPortalsSubmitBtn")
//     console.log('uploading'+imageupload)
//     if (!applicationID && !category.value && appDescription && !appName && !appLink) {
//         alert("Please fill required details")
//         return
//     }
//     const categoryOption = document.getElementById("CatOpt_" + category.value)
//     console.log(categoryOption.innerText);

//     const payload = {
//         "ApplicationID": applicationID,
//         "ApplicationName": appName,
//         "CategoryName": categoryOption.innerText,
//         "ApplicationURL": appLink,
//         "ApplicationDescription": appDescription,
//         "CategoryID": category.value,
//         "ApplicationImage": imageupload
//     }
//     console.log(payload);

//     try {
//         submitBtn.innerText = 'Submitting';
//         const res = await fetch("http://localhost:4000/api/v1/applications", {
//             method: "POST",
//             body: JSON.stringify(payload),
//             headers: {
//                 'Content-Type': "application/json"
//             },
//         })
//         if (res.ok) {
//             submitBtn.innerText = 'Submitted';
//             setTimeout(() => {
//                 submitBtn.innerText = 'Submit';
//             }, 2000);
//             console.log("Successfully submitted");
//         } else {
//             const message = (await res.json()).message
//             throw new Error(message ?? "Something went wrong")
//         }
//     } catch (error) {
//         submitBtn.innerText = 'Error';
//         setTimeout(() => {
//             submitBtn.innerText = 'Submit';
//         }, 2000);
//         alert(error.message ?? "Something went wrong!")
//         console.log(error.message);
//     }

// }

async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file); // Convert file to Data URL (Base64)
    });
}


async function postApplication(e) {
    e.preventDefault();
    const applicationID = prompt("Enter the applicationID");
    const category = document.getElementById("categorization");
    const appDescription = document.getElementById("appDescription").value;
    const appName = document.getElementById("appName").value;
    const appLink = document.getElementById("appLink").value;
    const imageupload = document.getElementById("imageUpload").files?.[0];
    const submitBtn = document.getElementById("addPortalsSubmitBtn");

    if (!applicationID || !category.value || !appDescription || !appName || !appLink) {
        alert("Please fill required details");
        return;
    }

    let base64Image = '';
    if (imageupload) {
        base64Image = await fileToBase64(imageupload);
    }

    const payload = {
        ApplicationID: applicationID,
        ApplicationName: appName,
        CategoryName: category.options[category.selectedIndex].text,
        ApplicationURL: appLink,
        ApplicationDescription: appDescription,
        CategoryID: category.value,
        ApplicationImage: base64Image,
    };

    try {
        submitBtn.innerText = 'Submitting';
        const res = await fetch("http://localhost:4000/api/v1/applications", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': "application/json"
            },
        });

        if (res.ok) {
            submitBtn.innerText = 'Submitted';
            setTimeout(() => {
                submitBtn.innerText = 'Submit';
            }, 2000);
            console.log("Successfully submitted");
        } else {
            const message = (await res.json()).message;
            throw new Error(message ?? "Something went wrong");
        }
    } catch (error) {
        submitBtn.innerText = 'Error';
        setTimeout(() => {
            submitBtn.innerText = 'Submit';
        }, 2000);
        alert(error.message ?? "Something went wrong!");
        console.log(error.message);
    }
}

// Helper function to convert file to Base64 string
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove the data URL part
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
