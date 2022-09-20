const fetch_uid = require("../fetch_uid");

test('converting valid Destination Names to uid should return uid', () =>{
    expect(fetch_uid.get_uid("Rome, Italy")).toBe("A6Dz");
    expect(fetch_uid.get_uid("Ericeira, Portugal")).toBe("QtoU");
    expect(fetch_uid.get_uid("San Pedro De Alcantara, Spain")).toBe("jlpB");
    expect(fetch_uid.get_uid("Singapore, Singapore (SIN-Changi)")).toBe("WD0M");
});

test('converting Invalid Destination Names with 1 char difference to uid should return false', () =>{
    expect(fetch_uid.get_uid("Rome, Ialy")).toBeFalsy();
    expect(fetch_uid.get_uid("Ericeira,Portugal")).toBeFalsy();
    expect(fetch_uid.get_uid("San Pedro De Alcantara Spain")).toBeFalsy();
    expect(fetch_uid.get_uid("Singapore, Singapore (SINChangi)")).toBeFalsy();
});

test('converting Completely Invalid Destination Names to uid should return false', () =>{
    expect(fetch_uid.get_uid("Himalayas")).toBeFalsy();
    expect(fetch_uid.get_uid("Mars")).toBeFalsy();
    expect(fetch_uid.get_uid("Pluto")).toBeFalsy();
    expect(fetch_uid.get_uid("17894")).toBeFalsy();
});

test('converting empty string to uid should return false', () =>{
    expect(fetch_uid.get_uid("")).toBeFalsy();
});