function toggleSections(){
  document.getElementById("plantation").style.display="none";
  document.getElementById("sales").style.display="none";
  document.getElementById("other").style.display="none";

  const category = document.getElementById("category").value;
  if(category==="plantation") document.getElementById("plantation").style.display="block";
  if(category==="sales") document.getElementById("sales").style.display="block";
  if(category==="other") document.getElementById("other").style.display="block";
}

function submitForm(){

  const data = {
    fullName: document.getElementById("fullName").value,
    address: document.getElementById("address").value,
    countryCode: document.getElementById("countryCode").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    category: document.getElementById("category").value,
    companyType: document.getElementById("otherType") ? document.getElementById("otherType").value : "",
    companyName: document.getElementById("plantationCompany")?.value || document.getElementById("salesCompany")?.value || document.getElementById("otherCompany")?.value || "",
    comments: document.getElementById("comments").value
  };

  fetch("https://script.google.com/macros/s/AKfycbxhBA3TQagtI0afALULtuSosaPUViKD1_v9-_IVMZJbqQH4pLwjVrF3Pe3tvGC4xNQpmw/exec",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    ["fullName","address","mobile","email","category","plantationCompany","salesCompany","otherCompany","comments"].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.value="";
    });
    document.getElementById("otherType").value="Own Company";
    toggleSections();

    const successDiv = document.getElementById("successMsg");
    successDiv.innerHTML = "Your application has been submitted successfully ✅";
    successDiv.style.display="block";

    const contactDiv = document.getElementById("contactMsg");
    contactDiv.innerHTML = `
      <span>Click the WhatsApp icon to contact our team:</span>
      <a href="https://wa.me/94771234567" target="_blank" style="margin-left:5px;text-decoration:none;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style="height:20px; vertical-align:middle;">
      </a>
      <br>
      <span>Or our team member will call you shortly. Thank you!</span>
    `;
    contactDiv.style.display="block";

  })
  .catch((err)=>{
    console.error(err);
    alert("Submission Failed ❌");
  });
}
