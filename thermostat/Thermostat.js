(function(){
  'use strict';
}());

function Thermostat() {
  this.temp = DEFAULT_TEMP;
  this.MIN_TEMP = 10;
  this.powerSave = true;
  this.maxTemp_PSM_ON = 25;
  this.maxTemp_PSM_OFF = 32;
  this.MED_ENERGY_USAGE_LIMIT = 18;
}

const DEFAULT_TEMP = 20;


Thermostat.prototype.getTemp = function() {
  return this.temp;
};

Thermostat.prototype.isMinTemp = function(){
  return this.temp === this.MIN_TEMP;
};

Thermostat.prototype.isMaxTemp = function(){
  if(this.isPowerSaveOn() === false){
    return this.temp === this.maxTemp_PSM_OFF;
  }
  return this.temp === this.maxTemp_PSM_ON;
};

Thermostat.prototype.increaseTemp = function() {
  if (this.isMaxTemp()){
    return;
  }
  this.temp += 1;
};

Thermostat.prototype.decreseTemp = function(){
  if (this.isMinTemp()) {
    return;
  }
  this.temp -= 1;
};

Thermostat.prototype.isPowerSaveOn = function() {
  return this.powerSave === true;
};

Thermostat.prototype.turnPowerSaveOff = function () {
  this.powerSave = false;
  this.maxTemp = this.maxTemp_PSM_OFF;
};

Thermostat.prototype.turnPowerSaveOn = function () {
  this.powerSave = true;
  this.maxTemp = this.maxTemp_PSM_ON;
  if (this.temp > this.maxTemp_PSM_ON) {
    this.temp = this.maxTemp;
  }
};

Thermostat.prototype.reset = function() {
  this.temp = DEFAULT_TEMP;
};

Thermostat.prototype.energyUsage = function () {
  if (this.temp < this.MED_ENERGY_USAGE_LIMIT) {
    return 'low-usage';
  }
  if (this.temp >= this.MED_ENERGY_USAGE_LIMIT && this.temp <= this.maxTemp_PSM_ON) {
    return 'medium-usage';
  }
  return 'high-usage';
};
