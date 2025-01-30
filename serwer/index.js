//Podstawowe sprawy
const express=require("express")
const cors=require("cors")
const mysql=require("mysql")

var port=3000

//Rzeczy dla aplikacji
const app=express()
app.use(cors())

//Laczenie sie z baza danych

//Rejestracja
app.get("/register/:imie/:nazwisko/:haslo/:profesja", (req, res)=>{
    let imie=req.params.imie
    let nazwisko=req.params.nazwisko
    let haslo=req.params.haslo
    let profesja=req.params.profesja
    res.send("Udalo sie zarejestrowac "+ imie+" "+nazwisko+" Z haslem: "+haslo)
})
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