import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "Build/UnityTest.loader.js",
      dataUrl: "Build/UnityTest.data",
      frameworkUrl: "Build/UnityTest.framework.js",
      codeUrl: "Build/UnityTest.wasm",
    });

  useEffect(() => {
  function handleGameWon(event) {
    alert("Unity says (GameWon): " + event.detail);
  }

  function handleGameFinished(event) {
    alert("Unity says (GameFinished): " + event.detail);
  }

  // ✅ Add both listeners
  window.addEventListener("GameWon", handleGameWon);
  window.addEventListener("GameFinished", handleGameFinished);

  // ✅ Clean up both listeners
  return () => {
    window.removeEventListener("GameWon", handleGameWon);
    window.removeEventListener("GameFinished", handleGameFinished);
  };
}, []);

  // Example: Send React → Unity message
  const handleSendMessage = () => {
    sendMessage("GameController", "ReactSaysHello", "Hello from React!");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Unity ↔ React Bridge Test</h1>
      <button onClick={handleSendMessage}>Send Message to Unity</button>
      <div style={{ marginTop: "20px", width: "800px", height: "600px" }}>
        <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}

export default App;
