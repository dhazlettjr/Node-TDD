'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('acme.sqlite', () => {
    console.log("Connection to db successful");
});

module.exports.getCustomers = () => {
    return [{}];
}

module.exports.getOneCust = (id) => {
    return new Promise ((resolve, reject)=>{
        db.get(`select * from customers where customer_id = ${id}`,(err, result) => {
            console.log(result)
            resolve(result)
        });
    });

}

module.exports.deleteCust = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`delete * from customers where customer_id = ${id}`, function () {
            resolve(id)
        });
    });
}

module.exports.addCustomer = ({firstName, lastName, city, street, state, zip, phone}) => {
    return new Promise( (resolve, reject) => {
        db.run(`INSERT INTO customers VALUES (
        null,
        "${firstName}",
        "${lastName}",
        "${city}",
        "${street}",
        "${state}",
        "${zip}",
        "${phone}"
        )`, function() {
        resolve({ id: this.lastID})
        });
    });
}