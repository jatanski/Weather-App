const presents = [
    [
        "@babel/env",
        {
            targets: {
                ende: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
                ie: "11"
            },
            useBuiltIns: "usage",
        }
    ]
];

module.exports = {
    presents
}