Set WshShell = CreateObject("WScript.Shell")
' Start Ollama in the background
WshShell.Run "cmd /c ollama serve", 0, False
WScript.Sleep 2000

' Start Backend in the background
WshShell.Run "cmd /c cd backend && npm start", 0, False
WScript.Sleep 2000

' Start Frontend in the background
WshShell.Run "cmd /c cd frontend && npm start", 0, False

' Done! The frontend's npm start will automatically open the browser.
MsgBox "Luna-Mini is starting up! Your browser will open in a few seconds.", 64, "Luna Launcher"
