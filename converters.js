const convertToCSV = array => {
    let keys = Object.keys(array[0]);
    let result = keys.join(",") + "\n";

    array.forEach(function(obj){
        keys.forEach(function(ind, value){
            if (value) {
                result += ",";
            }

            result += obj[ind];
        });

        result += "\n";
    });

    return result;
};

const convertToYaml = array => {
    let yaml ='';

    array.forEach(item => {
        yaml += '-' + "\n";
        for (let key in item) {
            yaml += "  " + key +': '+ item[key] + "\n"
        }
    });

    return yaml;
};

const convertToXML = array => {
    let xml = '<root>';

    for (let object of array) {
        xml += convertObjectToXML(object);
    }

    return xml + '</root>';
};

function convertObjectToXML(object) {
    let xml = '';

    for (let prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }

        if (!object[prop]) {
            continue;
        }

        xml += "<" + prop + ">";

        if (typeof object[prop] == "object") {
            xml += convertObjectToXML(new Object(object[prop]));
        } else {
            xml += object[prop];
        }

        xml += "</" + prop + ">" ;
    }

    return xml;
}

const convertToJSON = array => {
    let result = '[';

    for (let i = 0; i < array.length; i++) {
        result += '{';

        let namesKeysPerson = Object.keys(array[i]);

        for (let j = 0; j < namesKeysPerson.length; j++) {
            let temp = isNaN(array[i][namesKeysPerson[j]]) ? array[i][namesKeysPerson[j]] : Number(array[i][namesKeysPerson[j]]);

            result += typeof temp === 'number' ? `"${namesKeysPerson[j]}":${temp}` : `"${namesKeysPerson[j]}":"${temp}"`;

            if (j + 1 !== namesKeysPerson.length) {
                result += ',';
            }
        }

        result += '}';

        if (i + 1 !== array.length) {
            result += ',';
        }
    }

    result += ']';

    return result;
};

module.exports = {
    convertToCSV: convertToCSV,
    convertToYaml: convertToYaml,
    convertToXML: convertToXML,
    convertToJSON: convertToJSON
};