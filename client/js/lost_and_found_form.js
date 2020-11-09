function submitLAFForm() {
    //check the form for it email is fine
    var result = {}
    var email = document.getElementById("exampleInputEmail1").value
    var number = document.getElementById("LAFPhone").value
    var details = document.getElementById("LAFDescription").value
    // result["image"] = document.getElementById("LAFImage").value
    var title = document.getElementById("LAFTitle").value
    console.log(result) 
    const data = {email, number, details, title};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/testing', options);
    //add the data to the database
}