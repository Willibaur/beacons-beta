var app = (function() {
  var app = {},
    roomBeacon,
    updateTimer = null,
    inRoom = false;
		mAppInBrackground = false;

  app.initialize = function() {
    document.addEventListener("deviceready", function() {
			// EstimoteBeacons.requestAlwaysAuthorization();
    	// window.plugin.notification.local.promptForPermission();
      evothings.scriptsLoaded(onDeviceReady);
		}, false);
		// document.addEventListener('pause', function() { mAppInBackground = true; });
		// document.addEventListener('resume', function() { mAppInBackground = false; });
  };

  function onDeviceReady() {
    startScan();

    $("#in-room").html("Out of room!");

    updateTimer = setInterval(checkForBeacon, 1000);
  }

  function startScan() {
    function onBeaconsRanged(beaconInfo) {
      for (var i in beaconInfo.beacons) {
        var beacon = beaconInfo.beacons[i];

        if (beacon.rssi < 0 && beacon.macAddress == "D3:A9:05:05:83:4D") {
          console.log("Found room beacon");
          roomBeacon = beacon;
        }
      }
    }

    function onError(errorMessage) {
      console.log("Ranging beacons did fail: " + errorMessage);
    }


		estimote.beacons.requestAlwaysAuthorization();
    estimote.beacons.startRangingBeaconsInRegion(
      {}, onBeaconsRanged, onError);
  }

  function checkForBeacon() {
    if (roomBeacon) {
      console.log("Checking beacon distance");
			// onMonitor(roomBeacon.regionState);

      if (roomBeacon.distance < 0.2 && !inRoom) {
        console.log("Entered the room");
        inRoom = true;
				// $("body").hide();
				$(".ibeacon").hide();
				$(".thermostat").show();
        $("html").addClass("in-room");
        $("#in-room").html("Hi there");

				// turnOnBulb();
				//
      	// setTimeout(turnOnBulb, 1000);

      } else if (roomBeacon.distance >= 0.2 && inRoom) {
        console.log("Exited the room");
        inRoom = false;
        $("html").removeClass("in-room");
        $("#in-room").html("Colin has left the building!");

      	// setTimeout(turnOnBulb, 1000);

      }
    }
  }

	function turnOnBulb() {}
	//
	// function onMonitor(regionState)
	// {
	//     if (mAppInBackground)
	//     {
	//         window.plugin.notification.local.add(
	//         {
	//             message: 'Region state: ' + regionState.state,
	//             sound: null
	//         });
	//     }
	// }

  return app;
})();

app.initialize();
