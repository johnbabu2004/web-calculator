let darkMode=false;
const togglebutton=document.querySelector(".toggle-button");
togglebutton.addEventListener("click",()=>{
    darkMode=!darkMode;
    togglebutton.innerHTML= darkMode?'<i class="fa-solid fa-toggle-on"></i>':'<i class="fa-solid fa-toggle-off"></i>';
    document.body.classList.remove("dark-mode","light-mode");
    if(darkMode)
        document.body.classList.add("dark-mode");
    else
    document.body.classList.add("light-mode");
})
