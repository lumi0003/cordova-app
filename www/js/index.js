'use strict';
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener("deviceready", init);
document.addEventListener('DOMContentLoaded', init);
var teams = [];
var scores = [];
let pages = document.querySelectorAll('[data-role="page"]');
let links = document.querySelectorAll('[data-role="nav"] a');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", navigate);
}
var reload = document.getElementById("nav_reload");
document.addEventListener("click", reload)

function navigate(ev) {
    ev.preventDefault();
    let link = ev.currentTarget;
    console.log(link);
    // split a string into an array of substrings using # as the seperator
    let id = link.href.split("#")[1]; // get the href page name
    console.log(id);
    //update what is shown in the location bar
    history.replaceState({}, "", link.href);
    for (let i = 0; i < 2; i++) {
        if (pages[i].id == id) {
            pages[i].classList.add("active");
        }
        else {
            pages[i].classList.remove("active");
        }
    }
}

function reload() {
    init.reload(true);
    ev.preventDefault();
    pages.classList.add("active");
};
//let pages = []; // used to store all our screens/pages
//let links = []; // used to store all our navigation links
function init() {
    let url = "https://griffis.edumedia.ca/mad9014/sports/quidditch.php";
    fetch(url).then(function (response) {
        console.log("got it ", response.status)
        return response.json();
    }).then(function (data) {
        //console.dir(data);
        processData(data);
    }).catch(function (err) {
        console.log("Error");
        console.dir(err);
    });
}

function processData(data) {
    console.log("Processing data");
    console.dir(data);
    teams = data.teams;
    var scores = data.scores;
    for (var i = 0; i < scores.length; i++) {
        console.log(i);
        var date = scores[i].date;
        console.log(date);
        var game1 = scores[i].games[0];
        console.log(game1);
        var awayscrore1 = game1.away_score;
        var homescrore1 = game1.home_score;
        var game2 = scores[i].games[1];
        var awayscrore2 = game2.away_score;
        var homescrore2 = game2.home_score;
        var hometeamnamegame1 = game1.home;
        var awayteamnamegame1 = game1.away;
        var hometeamnamegame2 = game2.home;
        var awayteamnamegame2 = game2.away;
        var hnm1 = getTeamName(hometeamnamegame1);
        var anm1 = getTeamName(awayteamnamegame1);
        var hnm2 = getTeamName(hometeamnamegame2);
        var anm2 = getTeamName(awayteamnamegame2);
        console.log(anm1);
        //        creating stats in the back//
        var h3 = document.createElement("h3");
        var when1 = document.createTextNode(date);
        h3.appendChild(when1);
        var vs1 = "\n" + hnm1 + " vs." + anm1 + "\n";
        var sc1 = homescrore1 + "   " + awayscrore1 + "\n";
        var vs2 = hnm2 + " vs." + anm2 + "\n";
        var sc2 = homescrore2 + "   " + awayscrore2 + "\n";
        var game1stat = document.createTextNode(vs1);
        var game2stat = document.createTextNode(vs2);
        var game1score = document.createTextNode(sc1);
        var game2score = document.createTextNode(sc2);
        //        appending to html//
        var stat = document.getElementById("results");
        var tr1 = document.createElement("tr");
        var td1 = document.createElement("th");
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var div4 = document.createElement("div");
        var div5 = document.createElement("div");
        var table1 = document.createElement("table");
        console.log(table1);
        td1.appendChild(when1);
        div.appendChild(game1stat);
        div4.appendChild(game1score);
        div2.appendChild(game2stat);
        div5.appendChild(game2score)
        td1.appendChild(div);
        td1.appendChild(div2);
        div.appendChild(div4);
        div2.appendChild(div5)
        tr1.appendChild(td1);
        table1.appendChild(tr1);
        stat.appendChild(table1);
        /*for (var s = 0; s < teams.length; s++) {
            var teamstands = teams[s].name;
            console.log(teamstands);
            var standstat = document.getElementById("stand-by-team");
            var table2 = document.createElement("table");
            var tr2 = document.createElement("tr");
            var td2 = document.createElement("th");
            var div = document.createElement("div");
            var div2 = document.createElement("div")
            var table1 = document.createElement("table");
            td2.innerHTML = teamstands;
            tr2.appendChild(td2);
            table2.appendChild(tr2);
            standstat.appendChild(table2);*/
    }
    var teamsToSort = [];
    for (var s = 0; s < teams.length; s++) {
        var teamstands = teams[s].name;
        console.log(teamstands);
        var a = Math.floor((Math.random() * 4) + 1);
        var b = Math.floor((Math.random() * 3) + 1);
        var c = Math.floor((Math.random() * 2) + 1);
        var d = (a * 2) + c;
        // *************build array of objects and sort*******************************
        //        var teamsToSort = [];        
        teamsToSort[s] = {
            name: teams[s].name
            , score1: a
            , score2: b
            , score3: c
            , score4: d
        };
    }
    teamsToSort.sort(function (a, b) {
        return b.score4 - a.score4
    });
    // ********************************************
    for (var i = 0; i < teamsToSort.length; i++) {
        var teamstands = teamsToSort[i].name;
        var a = teamsToSort[i].score1;
        var b = teamsToSort[i].score2;
        var c = teamsToSort[i].score3;
        var d = teamsToSort[i].score4;
        var icons = document.getElementById("icons")
        var standstat = document.getElementById("stand-by-team");
        var table2 = document.createElement("table");
        var tr2 = document.createElement("tr");
        var td2 = document.createElement("th");
        var td3 = document.createElement("th");
        var td4 = document.createElement("th");
        var td5 = document.createElement("th");
        var td6 = document.createElement("th");
        var div = document.createElement("div");
        var div2 = document.createElement("div")
        var table1 = document.createElement("table");
        td2.innerHTML = teamstands;
        td3.innerHTML = a;
        td4.innerHTML = b;
        td5.innerHTML = c;
        td6.innerHTML = d;
        tr2.appendChild(td2);
        tr2.appendChild(td3);
        tr2.appendChild(td4);
        tr2.appendChild(td5);
        tr2.appendChild(td6);
        table2.appendChild(tr2);
        standstat.appendChild(table2);
    }
}

function getteampic(name) {}

function getTeamName(id) {
    var team = "";
    for (var i = 0; i < teams.length; i++) {
        if (id == teams[i].id) {
            team = teams[i].name;
            break;
        }
    }
    return team;
}