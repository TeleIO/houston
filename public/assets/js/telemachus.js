var Telemachus = Class.create({
  initialize: function(host, port){
    this.updateConnection(host, port)
    this.receiverFunctions = []
    this.subscribedFields = {}
    this.orbitingBodies = this.getOrbitalBodies()
    this.rate = 500

    this.loopTimeout = setTimeout(this.poll.bind(this), this.rate)
  },

  url: function(){
    return "http://" + this.host + ":" + this.port + "/telemachus/datalink"
  },

  updateConnection: function(host, port){
    this.host = host
    this.port = port
  },

  addReceiverFunction: function(func){
    this.receiverFunctions.push(func)
  },

  subscribeToData: function(fields){
    for (var i = fields.length - 1; i >= 0; i--) {
      var field = fields[i]
      this.subscribedFields[field] = field
    };
  },

  dispatchMessages: function(data){
    // var data = JSON.parse('{"b.o.gravParameter[1]":3531600000000,"t.universalTime":3581870.82772113,"v.angularVelocity":0,"o.period":2444.1893534157,"v.long":61.801426478683,"v.lat":-33.9585175016608,"o.argumentOfPeriapsis":357.579829353199,"o.lan":233.624811493994,"o.inclination":48.7159269982956,"o.eccentricity":0.134385986401745,"o.maae":1.33174069297012,"o.sma":811509.900257805,"o.trueAnomaly":230.564835549741}')
    // var data = JSON.parse('{"b.o.gravParameter[1]":3531600000000,"t.universalTime":3676217.82772113,"v.angularVelocity":0,"o.period":2444.1893534157,"v.long":-165.90632282676,"v.lat":44.3064867638228,"o.argumentOfPeriapsis":357.579829353199,"o.lan":233.624811493994,"o.inclination":48.7159269982956,"o.eccentricity":0.134385986401745,"o.maae":1.33174069297012,"o.sma":811509.900257805,"o.trueAnomaly":114.057337680348}')
    // var data = JSON.parse('{"b.o.gravParameter[1]":3531600000000,"t.universalTime":3976443.82772113,"v.angularVelocity":0,"o.period":2444.1893534157,"v.long":-214.641429986697,"v.lat":33.842717029972,"o.argumentOfPeriapsis":357.579829353199,"o.lan":233.624811493994,"o.inclination":48.7159269982956,"o.eccentricity":0.134385986401745,"o.maae":1.33174069297012,"o.sma":811509.900257805,"o.trueAnomaly":50.2472793085986}')
    // var data = JSON.parse('{"b.o.gravParameter[1]":3531600000000,"t.universalTime":4034854.82772113,"v.angularVelocity":0,"o.period":2444.1893534157,"v.long":-143.849104451046,"v.lat":0.414308005647656,"o.argumentOfPeriapsis":357.579829353199,"o.lan":233.624811493994,"o.inclination":48.7159269982956,"o.eccentricity":0.134385986401745,"o.maae":1.33174069297012,"o.sma":811509.900257805,"o.trueAnomaly":3.16662876396108}')
    for (var i = this.receiverFunctions.length - 1; i >= 0; i--) {
      try{
        this.receiverFunctions[i](data)
      } catch(e){
        console.error(e)
      }
    };
  },

  send: function(message){
    this.socket.send(JSON.stringify(message))
  },

  getOrbitalBodyInfo: function(name){
    var properties = this.orbitingBodies[name]

    if(properties){
      return Object.extend({name: name}, properties)
    } else{
      return null
    }
  },

  poll: function(){
    var params = []

    Object.keys(this.subscribedFields).forEach(function(field){
      var sanitizedFieldName = field.replace("[", "{").replace("]","}")
      params.push(sanitizedFieldName + "=" + field)
    })

    var requestURL = this.url() + "?" + params.join("&")

    new Ajax.Request(requestURL, {
      method: "get",
      onSuccess: function(response){
        var rawData = JSON.parse(response.responseText)
        var data = {}

        Object.keys(rawData).forEach(function(key){
          var convertedFieldName = key.replace("{", "[").replace("}", "]")
          data[convertedFieldName] = rawData[key]
        })

        this.dispatchMessages(data)
      }.bind(this),

      onComplete: function(response){
        setTimeout(this.poll.bind(this),this.rate);
      }.bind(this)
    })
  },

  getOrbitalBodies: function(){
    return {
      "Kerbol" : {
        id: 0,
        mapBody: null,
        surfaceGravity: 17.1 //m/s^2
      },
      "Kerbin" : {
        id: 1,
        mapBody: L.KSP.CelestialBody.KERBIN,
        surfaceGravity: 9.81 //m/s^2
      },
      "Mun" : {
        id: 2,
        mapBody: L.KSP.CelestialBody.MUN,
        surfaceGravity: 1.63 //m/s^2
      },
      "Minmus" : {
        id: 3,
        mapBody: L.KSP.CelestialBody.MINMUS,
        surfaceGravity: 0.491 //m/s^2
      },
      "Moho" : {
        id: 4,
        mapBody: L.KSP.CelestialBody.MOHO,
        surfaceGravity: 2.70 //m/s^2
      },
      "Eve" : {
        id: 5,
        mapBody: L.KSP.CelestialBody.EVE,
        surfaceGravity: 16.7 //m/s^2
      },
      "Duna" : {
        id: 6,
        mapBody: L.KSP.CelestialBody.DUNA,
        surfaceGravity: 2.94 //m/s^2
      },
      "Ike" : {
        id: 7,
        mapBody: L.KSP.CelestialBody.IKE,
        surfaceGravity: 1.10 //m/s^2
      },
      "Jool" : {
        id: 8,
        mapBody: L.KSP.CelestialBody.JOOL,
        surfaceGravity: 7.85 //m/s^2
      },
      "Laythe" : {
        id: 9,
        mapBody: L.KSP.CelestialBody.LAYTHE,
        surfaceGravity: 7.85 //m/s^2
      },
      "Vall" : {
        id: 10,
        mapBody: L.KSP.CelestialBody.VALL,
        surfaceGravity: 2.31 //m/s^2
      },
      "Bop" : {
        id: 11,
        mapBody: L.KSP.CelestialBody.BOP,
        surfaceGravity: 0.589 //m/s^2
      },
      "Tylo" : {
        id: 12,
        mapBody: L.KSP.CelestialBody.TYLO,
        surfaceGravity: 7.85 //m/s^2
      },
      "Gilly" : {
        id: 13,
        mapBody: L.KSP.CelestialBody.GILLY,
        surfaceGravity: 0.049 //m/s^2
      },
      "Pol" : {
        id: 14,
        mapBody: L.KSP.CelestialBody.POL,
        surfaceGravity: 0.373 //m/s^2
      },
      "Dres" : {
        id: 15,
        mapBody: L.KSP.CelestialBody.DRES,
        surfaceGravity: 1.13 //m/s^2
      },
      "Eeloo" : {
        id: 16,
        mapBody: L.KSP.CelestialBody.EELOO,
        surfaceGravity: 1.69 //m/s^2
      }
    }
  }
})