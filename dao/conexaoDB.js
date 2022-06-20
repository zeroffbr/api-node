const { Pool } = require('pg')

const pool = new Pool({
  'database': process.env.PG_DATABASE,
  'host':     process.env.PG_HOST,
  'user':     process.env.PG_USER,
  'password': process.env.PG_PASSWORD,
  'port':     process.env.PG_PORT,
  'max': 1000,
  // 'idleTimeoutMillis': 0,
  'connectionTimeoutMillis': 0,
});

// exports.execute = (query, params=[])=>{
//   return new Promise((resolve, reject)=>{
//      pool.connect((error, conn)=>{
//          if(error){ reject(error)}
//          else{
//           pool.query(query, params, (error, result, field)=>{
//             conn.release();
//             if (error) { reject(error + '')} else {resolve(result)}           
//           })
//         } 
//      })
//   })

exports.execute = (query, params=[])=>{
  return new Promise((resolve, reject)=>{
    pool.query(query, params, (error, result, field)=>{
      if (error) { 
        reject(error + '')
      } else {
        resolve(result)
      }           
    })
  })
}

exports.pool = pool;