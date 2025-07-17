// lib/loadFlutterwave.ts
export async function loadScript() {
    return new Promise((resolve, reject) => {
      if (document.getElementById("flutterwave-script")) return resolve(true)
  
      const script = document.createElement("script")
      script.src = "https://checkout.flutterwave.com/v3.js"
      script.id = "flutterwave-script"
      script.onload = () => resolve(true)
      script.onerror = () => reject("Failed to load Flutterwave script")
      document.body.appendChild(script)
    })
  };
  
