# Ideam-weather

[![Greenkeeper badge](https://badges.greenkeeper.io/cdiaz/ideam-weather.svg)](https://greenkeeper.io/)

#### Alarmas y Pronósticos climatológicos para el territorio Colombiano suministrados por el IDEAM

## Instalación

```sh
npm install ideam-weather --save
```

## Ejemplo de Uso

```js
var weather = require('ideam-weather');

weather.getCiudades(function(err, ciudades) {
  if (err) {
    return console.error(err);
  }
  console.log(ciudades);
})
```

```js
weather.getPronosticoCiudades('18001000',function(err, pronostico) {
  if (err) {
    return console.error(err);
  }
  console.log(pronostico);
})
```

## Métodos disponibles:

+ `getRegiones()`
+ `getCiudades()`
+ `getFenomenos()`
+ `getZonasMaritimas()`
+ `getNivelesAlarma()`

##### Pronósticos:
+ `getPronosticoCiudades('codigoDivipolaDane')`
+ `getPronosticoRegiones('codigoRegion')`
+ `getPronosticoMaritimos('codigoZonaMaritima')`

##### Alarmas:
+ `getAlarmasNacionales()`
+ `getAlarmasDepartamento('codigoDivipolaDane')`
+ `getAlarmasMunicipio('codigoDivipolaDane')`
+ `getAlarmasZonaMaritima('codigoZonaMaritima')`

## Notas:

El servicio de pronóstico por ciudad solo está disponible para algunas ciudades principales; para obtener la lista de ciudades disponibles y su respectivo código del DANE puede utilizar el método `getCiudades()`

Los códigos de región y zona maritima se obtienen con los métodos `getRegiones()` y `getZonasMaritimas()` respectivamente

Los pronósticos y Alarmas por Departamento y Municipio requieren el codigo asignado por el DANE en la codificación de la División Política Administrativa (Divipola) para dichas entidades territoriales, para mas información consultar el siguiente link: http://www.dane.gov.co/index.php/esp/nomenclaturas-y-clasificaciones/divipola


####  Documentación Oficial del servicio web:

http://institucional.ideam.gov.co/jsp/info/ws/index.html
