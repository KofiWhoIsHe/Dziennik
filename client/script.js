//fajny pomysl z position fix

let cSub=document.getElementById("WyborLekcji")
cSub.addEventListener("click",()=>{
    console.log(cSub.value)

    async function showGrade() {
        const res= await fetch(`http://localhost:3000/show-grades/${cSub.value}`)
        const grade= await res.json()

        let dlugosc=grade.length-1
        while(dlugosc>=0){
            console.log(grade.grade[dlugosc])
            dlugosc--;
        }
    }
    showGrade()
})