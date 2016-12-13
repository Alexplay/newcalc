//  Declare SQL Query for SQLite

var createStatement = "CREATE TABLE IF NOT EXISTS presupuestos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, precio TEXT)";

var selectAllStatement = "SELECT * FROM presupuestos";

var insertStatement = "INSERT INTO presupuestos (nombre, precio) VALUES (?, ?)";

var updateStatement = "UPDATE Contacts SET username = ?, useremail = ? WHERE id=?";

var deleteStatement = "DELETE FROM Contacts WHERE id=?";

var dropStatement = "DROP TABLE presupuestos";

var db = openDatabase("calculadora", "1.0", "calculadora", 200000);  // Open SQLite Database

var dataset;

var DataType;

function initDatabase()  // Function Call When Page is ready.
{
    try {
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
        {
            alert('SQLite no soportado.');
        }
        else {
            createTable();  // If supported then call Function for create table in SQLite
        }
    }
    catch (e) {
        if (e == 2) {
            // Version number mismatch.
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error " + e + ".");
        }
    }
}

function createTable()  // Function for Create Table in SQLite.
{
    db.transaction(function (tx) {
        tx.executeSql(createStatement, [], showRecords, onError);
    });
}

function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
    db.transaction(function (tx) {
        tx.executeSql(insertStatement, ['Pedro', '1250'], null, onError);
    });
}

function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
{
    var iddelete = id.toString();

    db.transaction(function (tx) {
        tx.executeSql(deleteStatement, [id], showRecords, onError);
        alert("Delete Sucessfully");
    });

    resetForm();
}

function updateRecord() // Get id of record . Function Call when Delete Button Click..
{
    var usernameupdate = $('input:text[id=username]').val().toString();

    var useremailupdate = $('input:text[id=useremail]').val().toString();

    var useridupdate = $("#id").val();

    db.transaction(function (tx) {
        tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError);
    });
}

function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
{
    db.transaction(function (tx) {
        tx.executeSql(dropStatement, [], showRecords, onError);
    });

    resetForm();

    initDatabase();
}

function loadRecord(i) // Function for display records which are retrived from database.

{

    var item = dataset.item(i);

    $("#username").val((item['username']).toString());

    $("#useremail").val((item['useremail']).toString());

    $("#id").val((item['id']).toString());

}

function onError(tx, error) // Function for Hendeling Error...
{
    alert(error.message);
}

function showRecords() // Function For Retrive data from Database Display records as list
{
    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                $('#test').append(item['nombre'] + ' ' + item['precio']);
                console.log(item['nombre']);
                console.log(item['precio']);


            }

        });

    });

}

$(document).ready(function () // Call function when page is ready for load..
{
    //initDatabase();
    //insertRecord();
    //showRecords();
});