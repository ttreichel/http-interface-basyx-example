const axios = require('axios');

const path = 'http://localhost:4001/aasServer/shells/https%3A%2F%2Fexample.com%2Fids%2Faas%2F0022_5140_4022_8315/aas/submodels/Maschinenstatus/submodel/submodelElements/'

/**
 * Function for sending PUT request to the defined path
 *
 * @param prop_name - name of the submodelElements you want to update
 * @param value - new value of submodelElement
 * @returns {Promise<{}>} - json object of format { propName: 'prop_name', new_value: 'value', status: resp.status }

 */
const sendPutRequestToSubmodelElementsVal = async (prop_name, value) => {
    try {
        const resp = await axios({
            method: "PUT",
            url: path + prop_name + "/value",
            data: value
        });

        let response = {}
        response.propName = prop_name
        response.new_value = value
        response.status = resp.status

        return response
    } catch (err) {
        console.error(err);
    }
};

/**
 * Array of possible values for the Geratestatus submodelElement
 * @type {string[]} array
 */
const geratestatusValues = ['Bereit', 'Busy', 'Fehlerzustand'];

/**
 * Function for extracting 1 random sample from a given array of values
 * @param arr - array of values
 * @returns number value from a given array
 */
const randomSample = (arr) => {
    return [...Array(arr.length).keys()]
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)
        .map(index => arr[index])[0]
}

/**
 * Function for generating random integer value inside of given interval
 * @param min - lower bound of the interval
 * @param max - upper bound 0f the interval
 * @returns number generated value
 */
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}


/**
 * Interval of sending requests in milliseconds
 * @type {number}
 * Current Interval: 1 sec 
*/
const intervalLength = 1000

/**
 * Run requests in a given interval
 */
setInterval(async () => {
    let geratestatusValueUpdateResp = await sendPutRequestToSubmodelElementsVal("Geratestatus", randomSample(geratestatusValues));
    console.log(geratestatusValueUpdateResp);

    let anzahlTeileValueUpdateResp = await sendPutRequestToSubmodelElementsVal("AnzahlTeile", '"'+randomNumber(1, 10)+'"');
    console.log(anzahlTeileValueUpdateResp);

    let ProgrammIDValueUpdateResp = await sendPutRequestToSubmodelElementsVal("ProgrammID", '"'+randomNumber(1, 1000)+'"');
    console.log(ProgrammIDValueUpdateResp);

    let zeilennummerValueUpdateResp = await sendPutRequestToSubmodelElementsVal("Zeilennummer", "num" + randomNumber(1, 100));
    console.log(zeilennummerValueUpdateResp);
}, intervalLength);



