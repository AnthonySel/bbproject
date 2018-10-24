import config from "../config";

function divideDate(dateNumber){
	// console.log(typeof dateNumber)
  let dateString = dateNumber.toString().split(".");
  let dateNew = parseInt(dateString[0]);
	return new Date((dateNew - (25567 + 2))*86400*1000).toDateString();
}

function dateLimit(dateBegin,months){
  if(months === undefined || isNaN(months)){
    return ""
  }
  else{
    let dateString = dateBegin.toString().split(".");
    let dateNew = parseInt(dateString[0]);
    return new Date(((dateNew - (25567 + 2))*86400*1000)+(months*2.628e+9)).toDateString();
  }
}

function dayLeft(date,months){
    if(months === undefined || isNaN(months)){
      return ""
    }
    else{
      let today = new Date().getTime();
      {/*let dateDebug = new Date(((date - (25567 + 2))*86400*1000)+(4*2.628e+9)).getTime();*/}
      let dateCounting =  new Date(((date - (25567 + 2))*86400*1000)+(months*2.628e+9)).getTime();
      {/*let resultDebug = Math.floor((dateDebug - dateCounting)/1000/3600/24);*/}
      let result = Math.floor((dateCounting - today)/1000/3600/24);

      return result
    }
}

function gettingNumberMonths(string){
  if(string !== undefined){
  const regex = /\D/g;
  const subst = '';
  const result = string.replace(regex,subst);
  const resultNumber = parseInt(result);
  return resultNumber;
  }

}

export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "via formulaire!A2:I",
        valueRenderOption: "UNFORMATTED_VALUE"
      })
      .then(
        response => {
          const data = response.result.values;
					const newData = data.filter(singleData => singleData[0] !== undefined);
				  let rows =
            newData.reverse().map(row => ({
              horodateur: divideDate(row[0]),
              name: row[1],
              city: row[2],
              skills: row[3],
              interns: row[4],
              contact: row[5],
              email: row[6],
              hire: row[7],
              // phone: row[8],
              ending: dateLimit(row[0],gettingNumberMonths(row[8])),
              timeLeft: dayLeft(row[0],gettingNumberMonths(row[8]))
            }
          )) || [];
          callback({
            rows
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}
