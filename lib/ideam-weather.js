var soap = require('soap');
var parseString = require('xml2js').parseString;
var callerId = require('caller-id');
var WSDL_URL = 'http://tausa.ideam.gov.co/portal/WebServicesIDEAMService?WSDL';

function Ideam () {

}

Ideam.prototype.getRegiones = function (cb) {
  webService({}, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.REGIONES.REGION));
  });
}

Ideam.prototype.getCiudades = function (cb) {
  webService({}, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.CIUDADES.CIUDAD));
  });
}

Ideam.prototype.getFenomenos = function (cb) {
  webService({}, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.FENOMENOS.FENOMENO));
  });
}

Ideam.prototype.getZonasMaritimas = function (cb) {
  webService({}, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.ZONAS_MARITIMAS.ZONA_MARITIMA));
  });
}

Ideam.prototype.getNivelesAlarma = function (cb) {
  webService({}, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.NIVELES.NIVEL));
  });
}

Ideam.prototype.getPronosticoCiudades = function (args,cb) {
  var params = {':codigoDivipolaDANE':args,':idioma':'es'};
  webService(params, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.PRONOSTICOS));
  });
}

Ideam.prototype.getPronosticoRegiones = function (args,cb) {
  var params = {':codigoRegion':args, ':idioma':'es'};
  webService(params, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.PRONOSTICOS));
  });
}

Ideam.prototype.getPronosticoMaritimos = function (args,cb) {
  var params = {':codigoZonaMaritima':args, ':idioma':'es'};
  webService(params, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.PRONOSTICOS));
  });
}

Ideam.prototype.getAlarmasNacionales = function (cb) {
  var params = {':idioma':'es'};
  webService(params, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.ALARMAS.ALARMA));
  });
}

Ideam.prototype.getAlarmasDepartamento = function (args,cb) {
  var params = {':codigoDivipolaDane':args,':idioma':'es'};
  webService(params, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.ALARMAS));
  });
}

Ideam.prototype.getAlarmasMunicipio = function (args,cb) {
  var params = {':codigoDivipolaDane':args,':idioma':'es'};
  webService(params, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.ALARMAS));
  });
}

Ideam.prototype.getAlarmasZonaMaritima = function (args,cb) {
  var params = {':codigoZonaMaritima':args, ':idioma':'es'};
  webService(params, function(err, result) {
    if(err) return cb(err);
    return cb(err, JSON.stringify(result.ALARMAS));
  });
}

var webService = function(args,cb) {

  var Method = callerId.getData().methodName;
  soap.createClient(WSDL_URL, {
    ignoredNamespaces: {
        namespaces: [],
        override: true
    }
  },function (err, client) {
    if(err) {
        return cb(err);
    }
    
    client[Method](args,function (err,result) {
        if(!err) {
            parseString(result.return, function (err, result) {
                if (!err) {
                    return cb(null, result);
                } else {
                    return cb(err);
                }
            });
        } else {
            return cb(err.root.Envelope.Body.Fault.faultstring);
        }
    });
  });
}

module.exports = new Ideam();