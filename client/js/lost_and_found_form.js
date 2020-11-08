function submitLAFForm() {
    //check the form for it email is fine
    var result = {}
    result["email"] = document.getElementById("exampleInputEmail1").value
    result["phoneNum"] = document.getElementById("LAFPhone").value
    result["details"] = document.getElementById("LAFDescription").value
    result["image"] = document.getElementById("LAFImage").value
    console.log(result) 

    //add the data to the database
}