export function handleMovement(socket) {
    const keys = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", Space: "hit" };
    const inputs = {};
  
    window.addEventListener("keydown", (e) => {
      if (keys[e.key]) inputs[keys[e.key]] = true;
      socket.emit("inputs", inputs);
    });
  
    window.addEventListener("keyup", (e) => {
      if (keys[e.key]) inputs[keys[e.key]] = false;
      socket.emit("inputs", inputs);
    });
  }
  