const testData = [
    [1, "abc", "1999-05-11", "Wonder land", 1],
    [2, "def", "1999-11-05", "Wonder land two", 0],
    [3, "ghi", "1999-07-14", "Wonder land three", 1],
];

const metaData = [
{
    name: "id",
    autoincrement: false,
    type: "INTEGER",
    default: null,
    nullable: false,
    comment: "Testing id"
},
{
    name: "name",
    type: "VARCHAR(19)",
    nullable: false,
    default: "testing",
    comment: "Source tablet device ID",
    value: ""
}, {
    name: "bday",
    type: "DATE",
    nullable: true,
    default: null,
    comment: "Source tablet device ID",
    value: ""
}, {
    name: "address",
    type: "VARCHAR(250)",
    nullable: false,
    default: "Default Address",
    comment: "Source tablet device ID",
    value: ""
}, {
    name: "isSet",
    autoincrement: false,
    type: "TINYINT",
    nullable: false,
    default: false,
    comment: "Testing checkbox",
    value: ""
}];

const tables = ["tbl1", "tbl2", "tbl3"]

export {testData, metaData, tables};