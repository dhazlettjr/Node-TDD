const {
    createTables
} = require('../js/makeTable');
const {
    getCustomers,
    addCustomer,
    getOneCust,
    deleteCust
} = require('../js/customersModule');
const {
    assert: {
        equal,
        property,
        isTrue,
        hasAnyKeys,
        isFunction,
        isObject,
        isArray,
        containsAllKeys,
        notExists
    }
} = require('chai');

describe('just a test', () => {
    it('should be equal', () => {
        equal(3, 1 + 2);
    });
});

describe("customers module", () => {
            describe("getCustomers", () => {
                it('should be a function', () => {
                    isFunction(getCustomers);
                });
                it('should return an array of objects', () => {
                    isArray(getCustomers());
                    isObject(getCustomers()[0]);
                });
                it('should get one customer', () => {
                    return getOneCust(7)
                        .then((result) => {
                            isObject(result);
                            hasAnyKeys(result, ['customer_id']);
                            containsAllKeys(result, ['customer_id', 'first_name', 'last_name', 'city', 'state', 'street', 'zip', 'phone']);
                        });
                    });
                    describe('deleteCust', () => {
                        it('should delete one customer', () => {
                            return deleteCust(2)
                            .then((data) => {
                                notExists(data[0]);

                            });
                        });
                    });
                });
                describe("adding a customer", () => {
                    let newCust = {
                        firstName: "Pat",
                        lastName: "Smith",
                        city: "Nowhere",
                        state: "Alabama",
                        zip: "22288",
                        phone: "555-444-7777"
                    };
                    beforeEach(done => {
                        createTables()
                            .then(() => {
                                done();
                            })
                    })


                    it('should return an object', () => {
                        return addCustomer(newCust)
                            .then((data) => {
                                console.log(data, "data");
                                isObject(data);
                            });
                    });
                    it("should add a new item to the db", () => {
                        return addCustomer(newCust)
                            .then((obj) => {
                                equal(9, obj.id);
                            })
                    });
                });
            });