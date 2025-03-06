//Podstawowe sprawy
const express=require("express")
const cors=require("cors")
const mysql=require("mysql")

var port=3000

//Rzeczy dla aplikacji
const app=express()
app.use(cors())

//Laczenie sie z baza danych

//Wyswietlanie uzytkownikow (potrzebne do logowania)
app.get("/show-users",(req,res)=>{
    res.send("Narazie tyle ci pokarze essa")
})
//Wyswietlanie ocen
app.get("/show-grades/:uczenID",(req,res)=>{
    let id=req.params.uczenID
    res.send("tobie rowniez narazie nic nie pokarze ale ocenki dla ucznia o ID "+id+ " To id to jest: "+typeof(id))
})
//Dodawanie ocen
app.get("/add-grade/:przedmiot/:ocena/:uczenId",(req,res)=>{
    let id=req.params.uczenId
    let ocena=req.params.ocena
    let przedmiot=req.params.przedmiot
    res.send("dodano ocene: "+ocena+" z "+przedmiot+" dla ucznia o id: "+id)
})
//
//
app.listen(port,()=>{
    console.log("Aplikacja uruchomiona")
})