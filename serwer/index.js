const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

var port = 3000;

//Rzeczy dla aplikacji
const app = express();
app.use(cors());

//Laczenie sie z baza danych
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "szkola"
});

//Wyswietlanie ocen
app.get("/show-grades/:subject", (req, res) => {
    let subject = req.params.subject;
    console.log("Received subject:", subject); // Log the received subject
    let sql = `SELECT Przedmiot, Ocena, Data_dodania FROM Oceny WHERE Przedmiot = ?`;
    con.query(sql, [subject], (err, wynik) => {
        if (err) {
            console.error("Błąd podczas wykonywania zapytania:", err);
            res.status(500).json({ error: "Błąd serwera" });
            return;
        }
        console.log("Wynik zapytania:", wynik); // Log the query result
        res.json(wynik.length ? wynik : []); // Ensure the response is always a valid JSON array
    });
});

//Dodawanie ocen
app.get("/add-grade/:przedmiot/:ocena", (req, res) => {
    let przedmiot = req.params.przedmiot;
    let ocena = req.params.ocena;
    let sql = `INSERT INTO Oceny (Przedmiot, Ocena, Data_dodania) VALUES (?, ?, NOW())`;
    con.query(sql, [przedmiot, ocena], (err, wynik) => {
        if (err) {
            console.error("Błąd podczas dodawania oceny:", err);
            res.status(500).json({ error: "Błąd serwera" });
            return;
        }
        res.send(`Dodano ocenę: ${ocena} z przedmiotu: ${przedmiot}`);
    });
});

app.listen(port, () => {
    console.log("Aplikacja uruchomiona");
});
