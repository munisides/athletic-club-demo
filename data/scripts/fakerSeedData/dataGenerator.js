const fs = require('fs');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');
const { v4 } = require('uuid');

// data structure
// password
// const defaultPassword = process.env.SEED_DEFAULT_USER_PASSWORD;
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync("s3cr3tPassword", salt);

// avatar
const getUserAvatar = (identifier) => {
    return `https://avatars.dicebear.com/api/human/${identifier}.svg`;
};

// utils
const createFakeUser = () => {
    // short id
    const id = shortid();

    // role
    const userRole = ['Player', 'Coach', 'Referee'];
    const randUser = userRole[Math.floor(Math.random() * userRole.length)];

    //
    return {
        id,
        uuid: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        role: randUser,
        password: passwordHash,
        email: faker.internet.email(),
        address: {
            streetA: faker.address.streetName(),
            streetB: faker.address.streetAddress(),
            streetC: faker.address.streetAddress(true),
            streetD: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            zipcode: faker.address.zipCode(),
            geo: {
                lat: faker.address.latitude(),
                lng: faker.address.longitude()
            }
        },
        phoneNumber: faker.phone.phoneNumberFormat(0),
        avatar: getUserAvatar(id),
        balance: faker.datatype.number({ min: 90000, max: 250000 }),
        createdAt: faker.date.past(),
        modifiedAt: faker.date.recent()
    };
};

/*
generate dataSet as example - from documentation
fs.writeFile(__dirname + '/dataSet.json', JSON.stringify(faker.helpers.userCard()), function () {
    console.log("dataSet generated successfully!");
});

// generate bigDataSet as example
const bigSet = [];

bigSet fro documentation
for (const i = 2; i >= 0; i--) {
    bigSet.push(faker.helpers.userCard()); // from documentation
};

fs.writeFile(__dirname + '/bigDataSet.json', JSON.stringify(bigSet), function () {
    console.log("bigDataSet generated successfully!");
});
*/

// template 
const bigSet = [];

for (let i = 0; i <= 4; i++) {
    newFakeUser = createFakeUser();
    bigSet.push(newFakeUser); 
};

fs.writeFile(__dirname + '/bigDataSet.json', JSON.stringify(bigSet), function () {
    console.log("bigDataSet generated successfully!");
});

