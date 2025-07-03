// import LightSystem from "./LightSystem.js";
// import LightController from "../services/LightController.js";

// class LightSystemTester {
//   constructor() {
//     this.lightSystem = new LightSystem();
//     this.testResults = [];
//   }

//   log(message) {
//     console.log(message);
//   }

//   logResult(testName, passed, details = "") {
//     const status = passed ? "PASSED" : "FAILED";
//     console.log(`${status}: ${testName} - ${details}`);
//     this.testResults.push({ testName, passed, details });
//   }

//   separator() {
//     console.log(
//       "--------------------------------------------------------------------------------"
//     );
//   }

//   async runAllTests() {
//     this.lightSystem = new LightSystem();

//     console.log("Starting Light System tests");
//     this.separator();

//     this.testSystemInitialization();

//     this.separator();

//     this.testLightManagement();
//     this.separator();

//     this.testIndividualLightControl();
//     this.separator();

//     this.testRoomBasedControl();
//     this.separator();

//     this.testSceneManagement();
//     this.separator();

//     this.testStatusAndInformation();
//     this.separator();

//     this.testSystemOperations();
//     this.separator();

//     this.testErrorHandling();
//     this.separator();

//     this.testEdgeCases();
//     this.separator();

//     this.printTestSummary();
//   }

//   testSystemInitialization() {
//     this.log("Testing system initialization");

//     try {
//       const system = new LightSystem();
//       this.logResult(
//         "System initialization",
//         system.lightController && system.roomLightManager && system.sceneManager
//       );
//     } catch (error) {
//       this.logResult("System initialization", false, error.message);
//     }
//   }

//   testLightManagement() {
//     this.log("Testing light management");
//     this.resetSystem();  // ← Important!
//     this.log('Testing light management');

//     //Adding lights

//     const light2 = this.lightSystem.addLight(
//       "livingroom-1",
//       "livingroom",
//       true
//     );
//     const light3 = this.lightSystem.addLight("kitchen-1", "kitchen", true);
//     const light4 = this.lightSystem.addLight("bedroom-1", "bedroom", true);
//     const light5 = this.lightSystem.addLight("bathroom-1", "bathroom", true);

//     this.logResult(
//       "Add light ~ Dimmable",
//       light2 && light3.isDimmable === true
//     );
//     this.logResult(
//       "Add light ~ Not Dimmable",
//       !light4 && light5.isDimmable === true
//     );

//     //Getting lights

//     const retrievedLight =
//       this.lightSystem.lightController.getLight("livingroom-1");
//     this.logResult(
//       "Get light",
//       retrievedLight && retrievedLight.lightId === "livingroom-1"
//     );

//     const allLights = this.lightSystem.lightController.getAllLights();
//     this.logResult("Get all lights", allLights.length === 4);

//     const bedRoomLights =
//       this.lightSystem.lightController.getLightsByRoom("bedroom");
//     this.logResult("Get lights by room", bedRoomLights.length === 1);

//     //Removing lights
//     // const removeLight = this.lightSystem.removeLight('livingroom-1');
//     // const afterRemoval = this.lightSystem.getAllLightsStatus();
//     // this.logResult('Remove light', removeLight && afterRemoval.length === 3);
//   }

//   testIndividualLightControl() {
//     this.log("Testing individual light control");

//     const turnOnResult = this.lightSystem.turnOnLight("livingroom-1");
//     const lightStatus1 = this.lightSystem.getLightStatus("livingroom-1");
//     this.logResult("Turn on light", turnOnResult && lightStatus1.isOn === true);

//     const brightnessResult = this.lightSystem.setLightBrightnessLevel(
//       "livingroom-1",
//       50
//     );
//     const lightStatus2 = this.lightSystem.getLightStatus("livingroom-1");
//     this.logResult(
//       "Set light brightness",
//       brightnessResult && lightStatus2.brightness === 50
//     );

//     const colorResult = this.lightSystem.setLightColor("livingroom-1", "red");
//     const lightStatus3 = this.lightSystem.getLightStatus("livingroom-1");
//     this.logResult(
//       "Set light color",
//       colorResult && lightStatus3.color === "red"
//     );

//     const turnOffResult = this.lightSystem.turnOffLight("livingroom-1");
//     const lightStatus4 = this.lightSystem.getLightStatus("livingroom-1");
//     this.logResult(
//       "Turn off light",
//       turnOffResult && lightStatus4.isOn === false
//     );

//     this.lightSystem.turnOnLight("bedroom-1");
//     const nonDimmableLight =
//       this.lightSystem.setLightBrightnessLevel("bedroom-1");
//     this.logResult("Non-dimmable light", nonDimmableLight === false);
//   }

//   testRoomBasedControl() {
//     this.log("Testing room based control");

//     this.lightSystem.addLight("Guest-1", "guest", true);
//     this.lightSystem.addLight("Guest-2", "guest", true);

//     this.lightSystem.turnOnRoom("guest");
//     const roomLights = this.lightSystem.getRoomStatus("guest");
//     const allOn = roomLights.every((light) => light.isOn === true);
//     this.logResult("Turn on room", allOn);

//     this.lightSystem.setRoomBrightnessLevel("guest", 50);
//     const roomStatus2 = this.lightSystem.getRoomStatus("guest");
//     const correctBrightness = roomStatus2.every(
//       (light) => !light.isDimmable || light.brightness === 50
//     );
//     this.logResult("Set room brightness", correctBrightness);

//     this.lightSystem.setRoomColor("guest", "red");
//     const roomStatus3 = this.lightSystem.getRoomStatus("guest");
//     const correctColor = roomStatus3.every((light) => light.color === "red");
//     this.logResult("Set room color", correctColor);

//     this.lightSystem.turnOffRoom("guest");
//     const roomStatus4 = this.lightSystem.getRoomStatus("guest");
//     const allOff = roomStatus4.every((light) => light.isOn === false);
//     this.logResult("Turn off room", allOff);
//   }

//   testSceneManagement() {
//     this.log("Testing scene management");

//     const sceneSettings = [
//       { lightId: "livingroom-1", isOn: true, brightness: 50, color: "red" },
//       { lightId: "bedroom-1", isOn: true, brightness: 100, color: "yellow" },
//       { lightId: "kitchen-1", isOn: true, brightness: 100, color: "blue" },
//     ];

//     this.lightSystem.createScene("party", sceneSettings);
//     const scenes = this.lightSystem.getAvailableScenes();
//     this.logResult("Create scene", scenes.includes("party"));

//     const activateResult = this.lightSystem.activateScene("party");

//     const light1Status = this.lightSystem.getLightStatus("livingroom-1");
//     const light2Status = this.lightSystem.getLightStatus("bedroom-1");
//     const light3Status = this.lightSystem.getLightStatus("kitchen-1");

//     const appliedScene =
//       light1Status &&
//       light2Status &&
//       light3Status &&
//       light1Status.isOn === true &&
//       light1Status.brightness === 50 &&
//       light1Status.color === "red" &&
//       light2Status.isOn === false &&
//       light2Status.brightness === 100 &&
//       light2Status.color === "yellow" &&
//       light3Status.isOn === true &&
//       light3Status.brightness === 100 &&
//       light3Status.color === "blue";

//     this.logResult("Activate scene", activateResult && appliedScene);

//     const invalidSceneResult = this.lightSystem.activateScene("invalid");
//     this.logResult("Invalid scene", invalidSceneResult === false);
//   }

//   testStatusAndInformation() {
//     this.log("Testing status information");

//     const lightStatus = this.lightSystem.getLightStatus("livingroom-1");
//     this.logResult(
//       "Get light status",
//       lightStatus &&
//         typeof lightStatus === "object" &&
//         typeof lightStatus.isOn === "boolean"
//     );

//     const roomStatus = this.lightSystem.getRoomStatus("livingroom");
//     this.logResult(
//       "Get room status",
//       Array.isArray(roomStatus) && roomStatus.length > 0
//     );

//     const allStatus = this.lightSystem.getAllLightsStatus();
//     this.logResult("Get all lights status", Array.isArray(allStatus));

//     const availableScenes = this.lightSystem.getAvailableScenes();
//     this.logResult("Get available scenes", Array.isArray(availableScenes));
//   }

//   testSystemOperations() {
//     this.log("Testing system operations");

//     this.lightSystem.turnOnLight("livingroom-1");
//     this.lightSystem.turnOnLight("bedroom-1");

//     this.lightSystem.turnOffAllLights();
//     const allStatus = this.lightSystem.getAllLightsStatus();
//     const allOff = allStatus.every((light) => light.isOn === false);
//     this.logResult("Turn off all lights", allOff);

//     this.lightSystem.emergencyMode();
//     const emergencyStatus = this.lightSystem.getAllLightsStatus();
//     const emergencyMode = emergencyStatus.every(
//       (light) => light.isOn && light.brightness === 100 && light.color === "red"
//     );
//     this.logResult("Emergency mode", emergencyMode);
//   }

//   testErrorHandling() {
//     this.log("Testing error handling");

//     const invalidLightOn = this.lightSystem.turnOnLight("invalid");
//     const invalidBrightness = this.lightSystem.setLightBrightnessLevel(
//       "invalid",
//       50
//     );
//     const invalidLightColor = this.lightSystem.setLightColor("invalid", "red");
//     const invalidLightStatus = this.lightSystem.getLightStatus("invalid");

//     this.logResult(
//       "Invalid light operations",
//       !invalidLightOn &&
//         !invalidBrightness &&
//         !invalidLightColor &&
//         !invalidLightStatus
//     );

//     this.lightSystem.addLight("testlight", "testroom");
//     const invalidBrightness1 = this.lightSystem.setLightBrightnessLevel(
//       "testlight",
//       -10
//     );
//     const invalidBrightness2 = this.lightSystem.setLightBrightnessLevel(
//       "testlight",
//       101
//     );

//     this.logResult(
//       "Invalid brightness",
//       !invalidBrightness1 && !invalidBrightness2
//     );
//   }

//   testEdgeCases() {
//     this.log("Testing edge cases");

//     this.lightSystem.turnOnLight("testlight");
//     this.lightSystem.setLightBrightnessLevel("testlight", 0);
//     const lightStatus = this.lightSystem.getLightStatus("testlight");
//     this.logResult("Brightness level 0 turns off light", lightStatus && !lightStatus.isOn);

//     this.lightSystem.setLightBrightnessLevel("testlight", 50);
//     const lightStatus2 = this.lightSystem.getLightStatus("testlight");
//     this.logResult("Brightness level  > 0 turns on light", lightStatus2 && lightStatus2.isOn);

//     this.lightSystem.turnOnRoom("emptyroom");
//     this.lightSystem.setRoomBrightnessLevel("emptyroom", 75);
//     this.lightSystem.setRoomColor("emptyroom", "green");
//     const emptyRoomStatus = this.lightSystem.getRoomStatus("emptyroom");
//     this.logResult("Empty room operations", Array.isArray(emptyRoomStatus));

//     const duplicate = this.lightSystem.addLight("testlight", "anothertestroom");
//     this.logResult("Duplicate light", !duplicate);
//   }

//   printTestSummary() {
//     const totalTests = this.testResults.length;
//     const passedTests = this.testResults.filter(
//       (result) => result.passed
//     ).length;
//     const failedTests = totalTests - passedTests;
//     console.log(
//       `\nTotal tests: ${totalTests}\nPassed tests: ${passedTests}\nFailed tests: ${failedTests}`
//     );
//     console.log(
//       "Success rate: " + ((passedTests / totalTests) * 100).toFixed(2) + "%"
//     );

//     if (failedTests > 0) {
//       console.log("\nFailed tests:");
//       this.testResults
//         .filter((test) => !test.passed)
//         .forEach((test) =>
//           console.log(` ~ ${test.testName} - ${test.details}`)
//         );
//     }

//     console.log("\n Testing completed");
//   }
//   resetSystem() {
//     this.lightSystem = new LightSystem();
// }

// }

// function demonstrateFeatures() {
//   console.log("Feature demonstration");
//   console.log("=".repeat(60));

//   const lightSystem = new LightSystem();

//   console.log("Setting up smart home");
//   lightSystem.addLight("living-main", "living-room");
//   lightSystem.addLight("living-accent", "living-room");
//   lightSystem.addLight("kitchen-main", "kitchen", false);
//   lightSystem.addLight("bedroom-main", "bedroom");
//   lightSystem.addLight("bathroom-main", "bathroom");

//   console.log("Individual light control demo");
//   lightSystem.turnOnLight("living-main");
//   lightSystem.setLightBrightnessLevel("living-main", 70);
//   lightSystem.setLightColor("living-main", "warm");

//   console.log("Room control demo");
//   lightSystem.turnOnRoom("kitchen-main");
//   lightSystem.setRoomBrightnessLevel("kitchen-main", 50);
//   lightSystem.setRoomColor("kitchen-main", "red");

//   console.log("Scene management demo");
//   lightSystem.createScene("movie-night", [
//     { lightId: "living-main", isOn: true, brightness: 50, color: "red" },
//     { lightId: "bedroom-main", isOn: false, brightness: 100, color: "yellow" },
//     { lightId: "kitchen-main", isOn: true, brightness: 100, color: "blue" },
//   ]);
//   lightSystem.createScene("dinner-party", [
//     { lightId: "living-main", isOn: true, brightness: 100, color: "red" },
//     { lightId: "bedroom-main", isOn: true, brightness: 100, color: "yellow" },
//     { lightId: "kitchen-main", isOn: false, brightness: 100, color: "blue" },
//   ]);
//   lightSystem.activateScene("movie-night");
//   console.log("\n Current system status: ");
//   console.log(JSON.stringify(lightSystem.getAllLightsStatus(), null, 2));

//   lightSystem.activateScene("dinner-party");
//   console.log("\n After dinner party scene: ");
//   console.log(JSON.stringify(lightSystem.getAllLightsStatus(), null, 2));

//   console.log("\n Emergency scene: ");
//   lightSystem.emergencyMode();
// }

// export { LightSystemTester, demonstrateFeatures };

// const isMainModule =
//   process.argv[1] && process.argv[1].endsWith("testLightSystem.js");

// if (isMainModule) {
//   console.log("Starting test execution...");

//   const tester = new LightSystemTester();

//   // Run tests
//   tester
//     .runAllTests()
//     .then(() => {
//       console.log("\n" + "=".repeat(60));
//       demonstrateFeatures();
//     })
//     .catch((error) => {
//       console.error("Test execution failed:", error);
//     });
// } else {
//   console.log("Test file loaded as module");
// }


import LightSystem from "./LightSystem.js";

class LightSystemTester {
  constructor() {
    this.lightSystem = new LightSystem();
    this.testResults = [];
  }

  log(message) {
    console.log(message);
  }

  logResult(testName, passed, details = "") {
    const status = passed ? "PASSED" : "FAILED";
    console.log(`${status}: ${testName} - ${details}`);
    this.testResults.push({ testName, passed, details });
  }

  separator() {
    console.log("--------------------------------------------------------------------------------");
  }

  async runAllTests() {
    console.log("Starting Light System tests");
    this.separator();

    this.testSystemInitialization();
    this.separator();

    this.testLightManagement();
    this.separator();

    this.testIndividualLightControl();
    this.separator();

    this.testRoomBasedControl();
    this.separator();

    this.testSceneManagement();
    this.separator();

    this.testStatusAndInformation();
    this.separator();

    this.testSystemOperations();
    this.separator();

    this.testErrorHandling();
    this.separator();

    this.testEdgeCases();
    this.separator();

    this.printTestSummary();
  }

 resetSystem() {
  this.lightSystem = new LightSystem();
  console.log("Light system initialized in resetSystem()");
  const added = [
    this.lightSystem.addLight("livingroom-1", "livingroom", true),
    this.lightSystem.addLight("kitchen-1", "kitchen", false),
    this.lightSystem.addLight("bedroom-1", "bedroom", true),
    this.lightSystem.addLight("bathroom-1", "bathroom", true),
    this.lightSystem.addLight("testlight", "testroom", true),
  ];

  for (const light of added) {
    console.log("Added light:", light?.lightId || "FAILED");
  }
}


  testSystemInitialization() {
    this.log("Testing system initialization");
    try {
      const system = new LightSystem();
      this.logResult(
        "System initialization",
        system.lightController && system.roomLightManager && system.sceneManager
      );
    } catch (error) {
      this.logResult("System initialization", false, error.message);
    }
  }

  testLightManagement() {
    this.log("Testing light management");
    this.resetSystem();

    const light2 = this.lightSystem.lightController.getLight("livingroom-1");
    const light3 = this.lightSystem.lightController.getLight("kitchen-1");
    const light4 = this.lightSystem.lightController.getLight("bedroom-1");
    const light5 = this.lightSystem.lightController.getLight("bathroom-1");

    this.logResult(
      "Add light ~ Dimmable",
      light2?.isDimmable === true && light4?.isDimmable === true
    );
    this.logResult(
      "Add light ~ Not Dimmable",
      light3?.isDimmable === false
    );

    this.logResult(
      "Get light",
      light2 && light2.lightId === "livingroom-1"
    );

    const allLights = this.lightSystem.getAllLightsStatus();
    this.logResult("Get all lights", allLights.length === 5);

    const bedRoomLights = this.lightSystem.lightController.getLightsByRoom("bedroom");
    this.logResult("Get lights by room", bedRoomLights.length === 1);
  }

  testIndividualLightControl() {
    this.log("Testing individual light control");
    this.resetSystem();

    const turnOnResult = this.lightSystem.turnOnLight("livingroom-1");
    const lightStatus1 = this.lightSystem.getLightStatus("livingroom-1");
    this.logResult("Turn on light", turnOnResult && lightStatus1?.isOn === true);

    const brightnessResult = this.lightSystem.setLightBrightnessLevel("livingroom-1", 50);
    const lightStatus2 = this.lightSystem.getLightStatus("livingroom-1");
    this.logResult("Set light brightness", brightnessResult && lightStatus2?.brightness === 50);

    const colorResult = this.lightSystem.setLightColor("livingroom-1", "red");
    const lightStatus3 = this.lightSystem.getLightStatus("livingroom-1");
    this.logResult("Set light color", colorResult && lightStatus3?.color === "red");

    const turnOffResult = this.lightSystem.turnOffLight("livingroom-1");
    const lightStatus4 = this.lightSystem.getLightStatus("livingroom-1");
    this.logResult("Turn off light", turnOffResult && lightStatus4?.isOn === false);

    this.lightSystem.turnOnLight("kitchen-1");
    const nonDimmableLight = this.lightSystem.setLightBrightnessLevel("kitchen-1");
    this.logResult("Non-dimmable light", nonDimmableLight === false);
  }

  testRoomBasedControl() {
    this.log("Testing room based control");
    this.resetSystem();

    this.lightSystem.addLight("Guest-1", "guest", true);
    this.lightSystem.addLight("Guest-2", "guest", true);

    this.lightSystem.turnOnRoom("guest");
    const roomLights = this.lightSystem.getRoomStatus("guest");
    this.logResult("Turn on room", roomLights.every(l => l.isOn));

    this.lightSystem.setRoomBrightnessLevel("guest", 50);
    const brightCorrect = this.lightSystem.getRoomStatus("guest").every(
      l => !l.isDimmable || l.brightness === 50
    );
    this.logResult("Set room brightness", brightCorrect);

    this.lightSystem.setRoomColor("guest", "red");
    const colorCorrect = this.lightSystem.getRoomStatus("guest").every(l => l.color === "red");
    this.logResult("Set room color", colorCorrect);

    this.lightSystem.turnOffRoom("guest");
    const allOff = this.lightSystem.getRoomStatus("guest").every(l => !l.isOn);
    this.logResult("Turn off room", allOff);
  }

  testSceneManagement() {
    this.log("Testing scene management");
    this.resetSystem();

    const sceneSettings = [
      { lightId: "livingroom-1", isOn: true, brightness: 50, color: "red" },
      { lightId: "bedroom-1", isOn: true, brightness: 100, color: "yellow" },
      { lightId: "kitchen-1", isOn: true, brightness: 100, color: "blue" },
    ];

    this.lightSystem.createScene("party", sceneSettings);
    const scenes = this.lightSystem.getAvailableScenes();
    this.logResult("Create scene", scenes.includes("party"));

    const activated = this.lightSystem.activateScene("party");

    const s1 = this.lightSystem.getLightStatus("livingroom-1");
    const s2 = this.lightSystem.getLightStatus("bedroom-1");
    const s3 = this.lightSystem.getLightStatus("kitchen-1");

    const validScene =
      s1?.isOn === true &&
      s1.brightness === 50 &&
      s1.color === "red" &&
      s2?.isOn === true &&
      s2.brightness === 100 &&
      s2.color === "yellow" &&
      s3?.isOn === true &&
      s3.brightness === 100 &&
      s3.color === "blue";

    this.logResult("Activate scene", activated && validScene);
    this.logResult("Invalid scene", this.lightSystem.activateScene("invalid") === false);
  }

  testStatusAndInformation() {
    this.log("Testing status information");
    this.resetSystem();

    const s = this.lightSystem.getLightStatus("livingroom-1");
    this.logResult("Get light status", s && typeof s.isOn === "boolean");

    const room = this.lightSystem.getRoomStatus("livingroom");
    this.logResult("Get room status", Array.isArray(room) && room.length > 0);

    const all = this.lightSystem.getAllLightsStatus();
    this.logResult("Get all lights status", Array.isArray(all));

    const scenes = this.lightSystem.getAvailableScenes();
    this.logResult("Get available scenes", Array.isArray(scenes));
  }

  testSystemOperations() {
    this.log("Testing system operations");
    this.resetSystem();

    this.lightSystem.turnOnLight("livingroom-1");
    this.lightSystem.turnOnLight("bedroom-1");

    this.lightSystem.turnOffAllLights();
    const allOff = this.lightSystem.getAllLightsStatus().every(l => !l.isOn);
    this.logResult("Turn off all lights", allOff);

    this.lightSystem.emergencyMode();
    const emergency = this.lightSystem.getAllLightsStatus().every(
      l => l.isOn && l.brightness === 100 && l.color === "red"
    );
    this.logResult("Emergency mode", emergency);
  }

  testErrorHandling() {
    this.log("Testing error handling");
    this.resetSystem();

    const on = this.lightSystem.turnOnLight("invalid");
    const brightness = this.lightSystem.setLightBrightnessLevel("invalid", 50);
    const color = this.lightSystem.setLightColor("invalid", "red");
    const status = this.lightSystem.getLightStatus("invalid");

    this.logResult("Invalid light operations", !on && !brightness && !color && !status);

    if (!this.lightSystem.getLightStatus("testlight")) {
      this.lightSystem.addLight("testlight", "testroom");
    }

    const b1 = this.lightSystem.setLightBrightnessLevel("testlight", -10);
    const b2 = this.lightSystem.setLightBrightnessLevel("testlight", 101);
    this.logResult("Invalid brightness", !b1 && !b2);
  }

  testEdgeCases() {
    this.log("Testing edge cases");
    this.resetSystem();

    if (!this.lightSystem.getLightStatus("testlight")) {
      this.lightSystem.addLight("testlight", "testroom", true);
    }

    this.lightSystem.turnOnLight("testlight");
    this.lightSystem.setLightBrightnessLevel("testlight", 0);
    const s1 = this.lightSystem.getLightStatus("testlight");
    this.logResult("Brightness level 0 turns off light", s1 && !s1.isOn);

    this.lightSystem.setLightBrightnessLevel("testlight", 50);
    const s2 = this.lightSystem.getLightStatus("testlight");
    this.logResult("Brightness level  > 0 turns on light", s2 && s2.isOn);

    this.lightSystem.turnOnRoom("emptyroom");
    this.lightSystem.setRoomBrightnessLevel("emptyroom", 75);
    this.lightSystem.setRoomColor("emptyroom", "green");
    const empty = this.lightSystem.getRoomStatus("emptyroom");
    this.logResult("Empty room operations", Array.isArray(empty));

    const dup = this.lightSystem.addLight("testlight", "anothertestroom");
    this.logResult("Duplicate light", dup === null || dup === false);
  }

  printTestSummary() {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.passed).length;
    const failed = total - passed;

    console.log(`\nTotal tests: ${total}\nPassed tests: ${passed}\nFailed tests: ${failed}`);
    console.log("Success rate: " + ((passed / total) * 100).toFixed(2) + "%");

    if (failed > 0) {
      console.log("\nFailed tests:");
      this.testResults.filter(r => !r.passed).forEach(t => {
        console.log(` ~ ${t.testName} - ${t.details}`);
      });
    }

    console.log("\n Testing completed");
  }
}

const isMainModule =
  process.argv[1] && process.argv[1].endsWith("testLightSystem.js");

if (isMainModule) {
  console.log("Starting test execution...");
  const tester = new LightSystemTester();

  tester.runAllTests().catch((err) => {
    console.error("Test execution failed:", err);
  });
}

export { LightSystemTester };
