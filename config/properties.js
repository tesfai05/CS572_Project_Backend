/**
 * Application Properties defined here
 */


const config = {
    dbConnectionHost: 'mongodb://localhost:27017/',
    dbName: 'social-network-db',
    // dbConnectionHost: 'mongodb://ummorpvfpwhtfzi5hmrv:WBHmUNqwGZd9J73YK7VJ@bjkxckz0on7werp-mongodb.services.clever-cloud.com:27017/',
    // dbName:'bjkxckz0on7werp',

    // geoDistance is used by GEOJSON to query posts based on user provided coords and geodistance
    geoDistance: { minDistance: 0, maxDistance: 1000},
    maxVoilationLimit: 20,
    jwt: {
        issuer: 'mwa-team',
        secret: '1qaz@WSX',
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        alg: 'HS256'
    },
    // Application codes which will be understood by the frontend
    appcodes:{
        follow: 111,
        unfollow: 112,
        newPost: 113,
        unhealthyPost: 114,
        accountBlocked: 115,
        postVerified: 116,
        profileUpdate: 117,
        likePost: 118,
        postCreated: 119,
        unableToUpload: 120
    }
};

module.exports = config;
