LittList.no
=========

LittList is a bibliography generator for norwegian students.

  - Enter a title, ISBN, author or url in the search box and select "Søk".
  - Add the results that fit your bibliography.
  - Press "Generer liste".
  - Magic.

LittList has received a lot of positive feedback amongst students and websites like Studenttorget.no, Gemini.no and Facebook.

> "De fleste studenter kjenner igjen følelsen. Du har skrevet en lang oppgav
> Klippet og limt avsnitt, rettet, lest gjennom igjen og igjen. Endelig ferdig 
> trodde du. Men det var du visst ikke. Den evinnelige litteraturlisten må selvsagt
> legges inn." - *Anders Solhøi, Studenttorget*

I have chosen to open source the frontend of LittList in hope of receiving assistance from others to maintain and correct bugs. Please submit any bugs to the issue tracker.

JSON API
----
### Books
**[<code>POST</code> /books](http://littlist.no/books)**
#### Request
```json
{"query":"Franz Kafka, The Metamorphosis"}
```
#### Response
```json
[
  {
    "id": "67249",
    "tittel": "Franz Kafka's The metamorphosis \/ edited and with an introduction by Harold Bloom",
    "forfatter": "{\"0\":\"Bloom, Harold\\r\"}",
    "isbn": "978-0-7910-9827-1, ib.",
    "trykt": "New York : Bloom's Literary Criticism",
    "aarstall": "c2008",
    "bibsys_id": "081137508"
  },
... 
```

###Websites
**[<code>POST</code> /websites](http://littlist.no/websites)**
#### Request
```json
{"query":"http://www.aftenposten.no/nyheter/uriks/Hevder-NSA-utnyttet-datasikkerhetshullet-7536136.html"}
```
#### Response
```json
[
  {
    "id": "3913",
    "url": "http:\/\/www.aftenposten.no\/nyheter\/uriks\/Hevder-NSA-utnyttet-datasikkerhetshullet-7536136.html",
    "domene": "www.aftenposten.no",
    "tittel": "Hevder NSA utnyttet datasikkerhetshullet",
    "forfatter": "NTB",
    "publisert": null
  }
]
```



Libraries
-----------

LittList uses a number of open source projects to work properly:

* [Angular] - fantastic frontend framework
* [jQuery] - duh
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Slim] - evented I/O for the backend running PHP
* [RedBean] - fast database abstraction layer


  [Twitter Bootstrap]: http://twitter.github.com/bootstrap/
  [Angular]: http://angularjs.org/
  [jQuery]: http://jquery.com  
  [Slim]: http://www.slimframework.com/
  [RedBean]: http://redbeanphp.com
  

