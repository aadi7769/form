function fun1() {
    const sDate = document.getElementById("startdate");
    const eDate = document.getElementById("enddate");
    eDate.min = sDate.value;
    const minEndDate = new Date(sDate.value);
    minEndDate.setFullYear(minEndDate.getFullYear() + 3);
    eDate.min = minEndDate.toISOString().split('T')[0];
   if (eDate.value && sDate.value >= eDate.value && sDate.value <= dob.value) {
        document.getElementById('enddateerror').innerHTML = "End date must be less than 3 years";
    }
    
}

function fun2() {
    const sDate = document.getElementById("startdate");
    const eDate = document.getElementById("enddate");
     sDate.max = eDate.value;
     const maxStartDate = new Date(eDate.value);
     maxStartDate.setFullYear(maxStartDate.getFullYear() - 3);
     sDate.max = maxStartDate.toISOString().split('T')[0];

     if (sDate.value && eDate.value <= sDate.value) {
        document.getElementById('startdateerror').innerHTML = " start date should be minimum 3 years";
     }
   
}

const dobInput = document.getElementById('dob');

dobInput.setAttribute('max', new Date().toISOString().split('T')[0]);










let flag= true;

let formDataArray = [];
let realdata = [];
let id = 0;
let editIndex = -1;
////////////////name keyword

closeEditModal();

function validateForm(event) {
    let validation = true;

    event.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmpassword = document.getElementById('confirmpassword').value.trim();
    var dob = document.getElementById('dob').value;
    var age = document.getElementById('age');
    var checkboxes = document.getElementsByName("myCheckbox");
    var radiobut = document.getElementsByName("gender");
    var courses = document.getElementById('courses').value;
    var startDate = document.getElementById('startdate').value;
    var endDate = document.getElementById('enddate').value;
    const today = new Date();


     
    document.getElementById('nameerror').innerHTML = '';
    document.getElementById('emailerror').innerHTML = '';
    document.getElementById('phoneerror').innerHTML = '';
    document.getElementById('passworderror').innerHTML = '';
    document.getElementById('confirmpassworderror').innerHTML = '';
    document.getElementById('doberror').innerHTML = '';
    document.getElementById('ageerror').innerHTML = '';
    document.getElementById('checkerror').innerHTML = '';
    document.getElementById('radioerror').innerHTML = '';
    document.getElementById('courseserror').innerHTML = '';
    document.getElementById('startdateerror').innerHTML='';
    document.getElementById('enddateerror').innerHTML='';

    if (!name) {
        document.getElementById('nameerror').innerHTML = 'Please fill the Name';
        validation = false;
    } else {
        let alphaPattern = /^[a-zA-Z\s]+$/;
        let checkName = alphaPattern.test(name);
        if (!checkName) {
            document.getElementById('nameerror').innerHTML = 'Please fill the Name in Alphabets ';
            validation = false;
        } else if (name.length < 3) {
            document.getElementById('nameerror').innerHTML = 'Please fill the minimum 3 chracter ';
            validation = false;
        }
    }

    if (!phone) {
        document.getElementById('phoneerror').innerHTML = 'Please fill the Contact';
        validation = false;
    } else {
        let numberPattern = /^[0-9]+$/;
        let checkContact = numberPattern.test(phone);
    
        if (!checkContact) {
            document.getElementById('phoneerror').innerHTML = 'Only Digits are allowed ';
            validation = false;
        } else if (phone.length !== 10) {
            document.getElementById('phoneerror').innerHTML = 'Please enter a 10-digit number.';
            validation = false;
        
        }

    }

   
    if (!email) {
        document.getElementById('emailerror').innerHTML = 'Please fill the Email Address';
        validation = false;
    } else {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let checkEmail = emailPattern.test(email);
        if (!checkEmail) {
            document.getElementById('emailerror').innerHTML = 'Please enter a valid Email Address';
            validation = false;
        }
        else  if (!isEmailUnique(email, editIndex)) {
            document.getElementById('emailerror').innerHTML = 'Email must be unique.';
            validation = false;
        }

    }


    if (!password) {
        document.getElementById('passworderror').innerHTML = 'Please fill the Password';
        validation = false;
        // 
    } else if (password.length < 8 || password.length > 15) {
        document.getElementById('passworderror').innerHTML = 'Password should be between 8 and 15 characters';
        validation = false;
        //  
    }


    if (!confirmpassword) {
        document.getElementById('confirmpassworderror').innerHTML = 'Please fill the Confirm Password';
        validation = false;
    } else if (password !== confirmpassword) {
        alert('Passwords do not match');
    }


    if (!isPhoneNumberUnique(phone, editIndex)) {
        document.getElementById('phoneerror').innerHTML = 'Phone number must be unique.';
        validation = false;
    }

    if (!dob) {
        document.getElementById('doberror').innerHTML = "please enter a date";
        validation = false;
    }
    else if (new Date(dob) > today) {
        document.getElementById('doberror').innerHTML = "please enter a valid date";
        validation = false;
    }

    if (!dob) {
        document.getElementById('ageerror').innerHTML = "please enter a date";
        validation = false;
    } else {
        dob = new Date(dob);
        var d = today.getFullYear() - dob.getFullYear();
        if (d <= 0 && dob > today) {
            age.value = "N.A";
            document.getElementById('ageerror').innerHTML = " please enter the correct date ";
            validation = false;
        }
        else {
            age.value = d;
        }
    }
    const checkit = Array.from(checkboxes).some(checkbox => checkbox.checked);
    const checkitt = Array.from(radiobut).some(radio => radio.checked);

    

    if (!checkit) {
        document.getElementById('checkerror').innerHTML = " please select at least one checkbox";
        validation = false;
    }
    if (!checkitt) {
        document.getElementById('radioerror').innerHTML = "please select one option";
        validation = false;
    }

    if (!courses) {
        document.getElementById('courseserror').innerHTML = 'Please select a course';
        validation = false;
    }

    if (!startDate) {
        document.getElementById('startdateerror').innerHTML = "Please enter a start date";
        validation = false;
    } else if (new Date(startDate) <= new Date(dob)) {
        document.getElementById('startdateerror').innerHTML = "Start date must be greater than the date of birth";
        validation = false;
    }

    if (!endDate) {
        document.getElementById('enddateerror').innerHTML = "Please enter an end date";
        validation = false;
    } else if (new Date(endDate) <= new Date(startDate)) {
        document.getElementById('enddateerror').innerHTML = "End date must be greater than the start date";
        validation = false;
    }


  console.log(validation);
    
    if (validation) {
        submitForm();
        return true;
       
    }
    else{
        return false;
    }
    
}
let form =document.getElementById('myForm');
function submitForm() {
// console.log("IMSISDE ");
    const naam = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    const dob = document.getElementById('dob').value;
    const age = document.getElementById('age').value;
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    const radiobut = Array.from(document.querySelectorAll('input[type="radio"]:checked'));

    const courseCheckboxes  = document.getElementById('courses').selectedOptions;
    const selectedCourses = Array.from(courseCheckboxes).map(course=>course.value);
    
    const stdate = document.getElementById('startdate').value;
    const enddate = document.getElementById('enddate').value;
    

    var coursecheck=selectedCourses.join(', ');    

    const radiocheck = Array.from(radiobut).filter(radioButton => radioButton.checked).map(radioButton => radioButton.value);
    const checkedValues = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    
    var resultcheck = checkedValues.join(', ');
    var resultradio = radiocheck.join(', ');

    const formData = {
        name: naam,
        email: email,
        phone: phone,
        dob: dob,
        age: age,
        check: resultcheck,
        radiobut: resultradio,
        courses:coursecheck,
        startdate: stdate,
        enddate: enddate,
        password:password,
        confirmpassword:confirmpassword

    };
    formDataArray = JSON.parse(localStorage.getItem('myformdata')) || [];
    formDataArray.push(formData);
    console.log(formData);
    localStorage.setItem('myformdata', JSON.stringify(formDataArray));
    Swal.fire({
        title: " Successfully Submitted!",
        icon: "success",
      });
      closeEditModal();
displayTableData();
    
}




let selectarray=[];
function displayTableData() {
    let formDataBody = document.getElementById("FormDataBody");

    let storedData = JSON.parse(localStorage.getItem('myformdata'));
    formDataBody.innerHTML = " ";

    storedData.forEach(function (dataEntry, index) {
        let newRow = formDataBody.insertRow();


        let box=newRow.insertCell();
           
        let boxcontainer=document.createElement("input");
        boxcontainer.type = 'checkbox';
        boxcontainer.id = 'newbox';
        boxcontainer.name = 'myselect';
         boxcontainer.value = 'exampleValue';

         box.appendChild(boxcontainer);
       
        

        let serialCell = newRow.insertCell();
        serialCell.textContent = index + 1;
        let nameCell = newRow.insertCell();

          let del=newRow.insertCell();   
                             ////////////////adding delete button 
          let deleteButton=document.createElement('button');
          deleteButton.textContent='Delete';
          deleteButton.classList.add('delete-button');
          del.appendChild(deleteButton);

          deleteButton.addEventListener('click',function(){
            deleteRow(index);
          })
   
              
           ///////creating check box
          

                


               ////applying edit button
               let edit=newRow.insertCell();
               let editButton=document.createElement('button');
               editButton.textContent='Edit';
               editButton.classList.add('edit-button');
               edit.appendChild(editButton);
               editButton.addEventListener('click',function()
               {
                openModal();
                edititems(index);

                // editsaveitems(index);
                  // val=true;
            });



        let nameContainer = document.createElement("div"); //
        nameContainer.textContent = dataEntry.name;
        nameContainer.style.cursor = "pointer";
        nameContainer.addEventListener("click", function () {
            displayUserDetails(index);
        });
        nameCell.appendChild(nameContainer);
    });
   // form.reset();
}
let editForm;  

function edititems(index) {
    document.getElementById('sub').disabled = true;

    document.getElementById('sub').style.display = 'none';
    document.getElementById('save').style.display = 'block';
    
    // Enable the "Update" button
    document.getElementById('save').disabled = false;

    editIndex = index; /////////////updatedddddddd
    let storedData = JSON.parse(localStorage.getItem('myformdata')) || [];
    let userData = storedData[index];

  //  let tempUserData = Object.assign({}, userData);

  



    // Populate form fields with existing data
    document.getElementById('name').value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('password').value = userData.password;
    document.getElementById('confirmpassword').value = userData.confirmpassword;
    document.getElementById('dob').value = userData.dob;
    document.getElementById('age').value = userData.age;

let selectcoursearr=userData.courses.split(', ');
var courses=document.getElementById('courses');

selectcoursearr.forEach(selectcourse=>{
    let match=Array.from(courses.options).find(option=>option.value===selectcourse);
    if(match)
    {
             match.selected=true;
    }
});



    // Set radio button state
    let genderRadios = document.querySelectorAll('input[name="gender"]');
    for (let i = 0; i < genderRadios.length; i++) {
        genderRadios[i].checked = false;
        if (genderRadios[i].value === userData.radiobut) {
            genderRadios[i].checked = true;
        }
    }

    // Set checkbox state
    let hobbyCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < hobbyCheckboxes.length; i++) {
        if (userData.check.includes(hobbyCheckboxes[i].value)) {
            hobbyCheckboxes[i].checked = true;
        } else {
            hobbyCheckboxes[i].checked = false;
        }
    }

    
    

    // Set date values
    document.getElementById('startdate').value = userData.startdate;
    document.getElementById('enddate').value = userData.enddate;
    console.log("After editing:", userData);
    // Add a click event listener to the save button
    document.getElementById('save').addEventListener('click', function (event) {
        event.preventDefault();

        // Validate and save the updated data
        if (validateForm(event)) {
            let updatedUserData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                password: document.getElementById('password').value.trim(),
                confirmpassword: document.getElementById('confirmpassword').value.trim(),
                dob: document.getElementById('dob').value.trim(),
                age: document.getElementById('age').value.trim(),
                radiobut: userData.radiobut,  
                check: Array.from(hobbyCheckboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value)
                    .join(', '),
                startdate: document.getElementById('startdate').value.trim(),
                enddate: document.getElementById('enddate').value.trim(),
            };

            let coursesDropdown = document.getElementById('courses');
            updatedUserData.courses = Array.from(coursesDropdown.selectedOptions).map(option => option.value).join(', ');


             storedData[index] = updatedUserData;
             localStorage.setItem('myformdata', JSON.stringify(storedData));
             Swal.fire({
                title: "Data Edited Successfully!",
                text: "All data has been edited!",
                icon: "success",
              }).then(() => {
                closeEditModal();

                setTimeout(() => {
                    location.reload();
                }, 400);
        
             } );
             document.getElementById('sub').disabled = false;
             form.reset();
        }
        displayTableData();

        
    });
    
}

function toggleAllCheckboxes() {
    const deleteItCheckbox = document.getElementById('deleteit');
    const checkboxes = document.querySelectorAll('input[name="myselect"]');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = deleteItCheckbox.checked;
    });
}


function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    form.reset();


    // Show the "Submit" button and hide the "Update" button
    document.getElementById('sub').style.display = 'block';
    document.getElementById('save').style.display = 'none';
    document.getElementById('save').disabled = true; //
    
   // location.reload();
}


document.getElementById('addUserButton').addEventListener('click', openModal);

function closeEditModal() {

    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    editIndex = -1; 
}



// function closeEditModal() {
//     const modal = document.getElementById('modal');
//     modal.style.display = 'none';
// }















function displayUserDetails(index) {
    let modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = "";

    let storedData = JSON.parse(localStorage.getItem('myformdata')) || [];
    let userData = storedData[index];

    for (let key in userData) {

        if (key !== 'password' && key !== 'confirmpassword') {
            let row = document.createElement("div");
            row.innerHTML = `${key}: ${userData[key]}`;
            modalContent.appendChild(row);
        }
    }

    let modal = document.getElementById("detailsModal");
    modal.style.display = "block";
}

function deleteRow(index){

    let data=JSON.parse(localStorage.getItem('myformdata')) || [];
    data.splice(index,1);
    localStorage.setItem('myformdata',JSON.stringify(data));
   // console.log(selectarray);
   displayTableData();

}



function deleteallentry() {
    let storedData = JSON.parse(localStorage.getItem('myformdata')) || [];

    if (!storedData.length) {
        alert("There is no data to delete.");
        return;
    }

    const checkboxes = document.querySelectorAll('#real-table tbody input[type="checkbox"]');
    const indicesToDelete = Array.from(checkboxes).map(checkbox =>
        checkbox.closest('tr').rowIndex - 1
    );

    if (!indicesToDelete.length) {
        alert("No entries selected for deletion.");
        return;
    }

    // Delete entries in reverse order to avoid index shifting
    indicesToDelete.sort((a, b) => b - a).forEach(index => storedData.splice(index, 1));

    localStorage.setItem('myformdata', JSON.stringify(storedData));

    displayTableData();
    document.getElementById('deleteit').checked = false;
}

function deleteSelectedEntries() {
    const checkboxes = document.querySelectorAll('input[name="myselect"]:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one entry to delete.');
        return;
    }

   
    let storedData = JSON.parse(localStorage.getItem('myformdata')) || [];

    // Iterate over checkboxes in reverse order to avoid skipping elements when removing
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        const rowIndex = checkboxes[i].closest('tr').rowIndex - 1;
        storedData.splice(rowIndex, 1);
    }

    localStorage.setItem('myformdata', JSON.stringify(storedData));
    
    displayTableData(); // Refresh the displayed data
    document.getElementById('deleteit').checked = false;
}



function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
    // document.getElementById('overlay').style.display='none';
}





window.addEventListener("load", function () {
    displayTableData();
})

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
   
//         let storedData = JSON.parse(localStorage.getItem('myformdata'));
//         if (!Array.isArray(storedData)) {
//             storedData = [];
//         }
//         storedData.push(StringData);
//         localStorage.setItem('myformdata', JSON.stringify(storedData));

        
//         console.log("Stored Data:", storedData);

//         displayTableData();
//         // form.reset();
// });

// document.getElementById('deleteSelectedButton').addEventListener('click', function () {
//     openDeleteConfirmationModal();
// });

function openDeleteConfirmationModal() {
    const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
    deleteConfirmationModal.style.display = 'block';
}

function closeDeleteConfirmationModal() {
    const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
    deleteConfirmationModal.style.display = 'none';
}

function deleteit()
{
    const checkboxes = document.querySelectorAll('input[name="myselect"]:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one entry to delete.');
        
    }
    else {
        openDeleteConfirmationModal();
    }

}


function confirmDelete() {
    
    deleteSelectedEntries(); 
    closeDeleteConfirmationModal();
}

function openDeleteAllConfirmationModal() {
    const deleteAllConfirmationModal = document.getElementById('deleteAllConfirmationModal');
    deleteAllConfirmationModal.style.display = 'block';
}

function closeDeleteAllConfirmationModal() {
    const deleteAllConfirmationModal = document.getElementById('deleteAllConfirmationModal');
    deleteAllConfirmationModal.style.display = 'none';
}


function confirmDeleteAll() {
    
    deleteallentry(); 
    closeDeleteAllConfirmationModal();
}





//////////////////////////////////isunique


function isPhoneNumberUnique(phone, indexToExclude = -1) {
    const storedData = JSON.parse(localStorage.getItem('myformdata')) || [];

    for (let i = 0; i < storedData.length; i++) {
        if (i !== indexToExclude) {
            // Compare with other entries, excluding the current index if provided
            const storedEntry = storedData[i];
            if (storedEntry.phone === phone) {
                return false; // Duplicate phone number found
            }
        }
    }
    return true; // Phone number is unique
}


function isEmailUnique(email, indexToExclude = -1) {
    const storedData = JSON.parse(localStorage.getItem('myformdata')) || [];

    for (let i = 0; i < storedData.length; i++) {
        if (i !== indexToExclude) {
            // Compare with other entries, excluding the current index if provided
            const storedEntry = storedData[i];
            if (storedEntry.email === email) {
                return false; // Duplicate email found
            }
        }
    }
    return true; // Email is unique
}






