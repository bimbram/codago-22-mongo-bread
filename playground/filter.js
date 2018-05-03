function filterQuery(userQuery, command, limit, offset) {
  let sqlQuery = ''
  let filterQuery = []
  let isFilter = false;

  if(command === 'getTableDataCount') {
    sqlQuery = 'SELECT COUNT(*) FROM bread'
  }
  else if(command === 'getTableData') {
    sqlQuery = 'SELECT * FROM bread'
  }

  if(userQuery.checkboxid && userQuery.id){
    filterQuery.push(`id = '${userQuery.id}'`);
    isFilter = true;
  }
  if(userQuery.checkboxstring && userQuery.datastring){
    filterQuery.push(`datastring = '${userQuery.datastring}'`);
    isFilter = true;
  }
  if(userQuery.checkboxinteger && userQuery.datainteger){
    filterQuery.push(`datainteger = ${userQuery.datainteger}`);
    isFilter = true;
  }
  if(userQuery.checkboxfloat && userQuery.datafloat){
    filterQuery.push(`datafloat = ${userQuery.datafloat}`);
    isFilter = true;
  }
  if(userQuery.checkboxdate && userQuery.startdate && userQuery.enddate){
    filterQuery.push(`datadate BETWEEN '${userQuery.startdate}' AND '${userQuery.enddate}'`);
    isFilter = true;
  }
  if(userQuery.checkboxboolean && userQuery.databoolean){
    filterQuery.push(`databoolean = '${userQuery.databoolean === "True" ? true : false}'`);
    isFilter = true;
  }
  if(isFilter){
    sqlQuery += ' WHERE ' + filterQuery.join(' AND ')
  }

  if(command === 'getTableDataCount') {
    //sqlQuery += ` LIMIT ${limit} OFFSET ${offset};`
  }
  else if(command === 'getTableData') {
    sqlQuery += ` ORDER BY id LIMIT ${limit} OFFSET ${offset};`
  }
  return sqlQuery;
}

function getTableData(cb) {
  MongoClient.connect(url, (error, db) => {
    if(error) {
      console.error(error);
    }
    const bread = db.collection('mongobreadcollection');
    bread.find(filter).toArray((err, docs) => {
      cb(docs);
    });
  });
}
