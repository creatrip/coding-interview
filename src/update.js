function update(state, updater) {
  for (let prop in updater) {
    const value = updater[prop];
    if (prop[0] === "$") {
      switch (prop) {
        case "$set": {
          return value;
        }
        case "$push": {
          if (!Array.isArray(state)) {
            throw new Error("Given state for $push must be array");
          } else if (!Array.isArray(value)) {
            throw new Error("Given updater value for $push must be array");
          } else {
            return state.concat(value);
          }
        }
        case "$unshift": {
          if (!Array.isArray(state)) {
            throw new Error("Given state for unshift must be array");
          } else if (!Array.isArray(value)) {
            throw new Error("Given updater value for $push must be array");
          } else {
            return value.concat(state);
          }
        }
        case "$merge": {
          if (typeof state !== "object") {
            throw new Error("Given state for unshift must be object");
          } else if (typeof value !== "object") {
            throw new Error("Given updater value for $push must be object");
          } else {
            return Object.assign({}, state, value);
          }
        }

        case "apply": {
        }
        default: {
          console.log("given setter not defined");
          return state;
        }
      }
    } else {
      console.log("traverse");
    }
  }
}

exports.update = update;
