"use strict";

 angular.module('echocarmes.config', [])

.constant('ENV', "PROD")
.constant('DEV', {url: 'http://cabinet-bmk.dyndns.org:81/public/index.php/medecin/'})
.constant('PROD', {url: 'http://192.168.100.10:81/public/index.php/medecin/'})
//Session timeout, en minutes
.constant('SESSION_TIMEOUT', 60);
