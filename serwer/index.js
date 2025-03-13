//Podstawowe sprawy
const express=require("express")
const cors=require("cors")
const mysql=require("mysql")

var port=3000

//Rzeczy dla aplikacji
const app=express()
app.use(cors())

//Laczenie sie z baza danych
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"szkoła"
})
//Wyswietlanie uzytkownikow (potrzebne do logowania)
app.get("/show-users",(req,res)=>{
    res.send("Narazie tyle ci pokaże essa")
})
//Wyswietlanie ocen
app.get("/show-grades/:subject",(req,res)=>{
    let subject=req.params.subject
    sql=`Select grade from grades where subject like '${subject}'`
    con.query(sql,(err,wynik0)=>{
        res.json(wynik0)
    })
})
//Dodawanie ocen
app.get("/add-grade/:przedmiot/:ocena/:uczenId",(req,res)=>{
    let id=req.params.uczenId
    let ocena=req.params.ocena
    let przedmiot=req.params.przedmiot
    res.send("dodano ocene: "+ocena+" z "+przedmiot+" dla ucznia o id: "+id)
})
//
app.listen(port,()=>{
    console.log("Aplikacja uruchomiona")
})