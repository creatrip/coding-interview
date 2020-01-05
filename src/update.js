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
            throw new Error("Given state for $unshift must be array");
          } else if (!Array.isArray(value)) {
            throw new Error("Given updater value for $unshift must be array");
          } else {
            return value.concat(state);
          }
        }
        case "$merge": {
          if (typeof state !== "object") {
            throw new Error("Given state for $merge must be object");
          } else if (typeof value !== "object") {
            throw new Error("Given updater value for $merge must be object");
          } else {
            return Object.assign({}, state, value);
          }
        }
        case "$apply": {
          if (typeof value !== "function") {
            throw new Error(
              "Given updater value for $apply must be a function"
            );
          } else {
            try {
              return value(state);
            } catch (err) {
              throw new Error("Error in $apply given function to state");
            }
          }
        }
        case "$splice": {
          if (!Array.isArray(state)) {
            throw new Error("Given state for $splice must be array");
          } else if (!Array.isArray(value)) {
            throw new Error("Given updater value for $splice must be array");
          } else {
            value.forEach(spliceArgs => {
              state.splice.apply(state, spliceArgs);
            });
            return state;
          }
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
